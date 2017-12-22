import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Persona } from './persona';
import { Recipe } from './recipe';
import { DataService } from './data.service';
import { PersonaService } from './persona.service';

@Injectable()
export class FusionService implements OnInit {
  private specialFusions = [];
  private rarePersona: string[];

  constructor(
    private dataService: DataService,
    private personaService: PersonaService
  ) { }

  ngOnInit() {
    this.dataService.getSpecialCombos().subscribe(
      specials => this.specialFusions = specials
    );
    this.dataService.getRarePersonae().subscribe(
      personas => this.rarePersona = personas
    );
  }
  /**
   * Fuse 2 persona. This can handle normal fusion, rare fusion or special fusion.
   * @param p1 first persona to fuse
   * @param p2 second persona to fuse
   * @returns {Persona} the result of the fusion or null
   */
  fuse(p1: Persona, p2: Persona): Persona {
    if (p1.name === p2.name) {
      return null;
    }
    // special
    const result = this.getSpecialFuseResult(p1, p2);
    if (result !== null) {
      return result;
    }
    // rare
    if ((p1.rare && !p2.rare) || (!p1.rare && p2.rare)) {
      const rarePersona = p1.rare ? p1 : p2;
      const normalPersona = p1.rare ? p2 : p1;
      return this.fuseRare(rarePersona, normalPersona);
    }
    // normal
    return this.fuseNormal(p1, p2);
  }

  /**
   * Return the result persona if 2 given persona are part of a special formula
   * @param persona1 The first persona
   * @param persona2 The second persona
   * @returns {Persona} the result persona if persona1 + persona2 is a special formula, null otherwise
   */
  private getSpecialFuseResult(persona1: Persona, persona2: Persona): Persona {
    for (let x = 0; x < this.specialFusions.length; x++) {
      const combo = this.specialFusions[x];
      if (((persona1.name === combo.sources[0] && persona2.name === combo.sources[1]) ||
        (persona2.name === combo.sources[0] && persona1.name === combo.sources[1]))) {
        let result: Persona;
        this.personaService.getPersona(combo.result).subscribe(
          p => result = p
        );
        return result;
      }
    }
    return null;
  }

  /**
 * Fuse 2 persona. Doesn't handle rare fusion and special fusion.
 * @param persona1 First persona to fuse
 * @param persona2 Second persona to fuse
 * @returns The result persona, or null when the fusion is not possible,
 * the fusion is a rare fusion, or the fusion is a special fusion.
 */
  private fuseNormal(persona1: Persona, persona2: Persona): Persona {
    // don't handle rare fusion between a normal persona and a rare persona
    if ((persona1.rare && !persona2.rare) || (persona2.rare && !persona1.rare)) {
      return null;
    }

    // don't handle 2-persona-special fusions
    if (this.getSpecialFuseResult(persona1, persona2) !== null) {
      return null;
    }

    const level = 1 + Math.floor((persona1.level + persona2.level) / 2);
    let arcana;
    this.dataService.getTwoCombos(persona1.arcana, persona2.arcana).subscribe(a => arcana = a);
    if (!arcana) {
      // only Judgement + [Justice/Strength/Chariot/Death] can result in this
      return null;
    }

    let arcanaPersona: Persona[];
    this.personaService.getPersonaByArcana(arcana).subscribe(ps => arcanaPersona = ps);

    let persona: Persona = null;
    let found = false;
    if (persona1.arcana === persona2.arcana) {
      // same-arcana down-rank fusion
      for (let i = arcanaPersona.length - 1; i >= 0; i--) {
        persona = arcanaPersona[i];
        if (persona.level <= level) {
          if (persona.special || persona.rare || persona === persona1 || persona === persona2) {
            continue;
          }
          found = true;
          break;
        }
      }
    } else {
      // different-arcana fusion
      for (let i = 0; i < arcanaPersona.length; i++) {
        persona = arcanaPersona[i];
        if (persona.level >= level) {
          if (persona.special || persona.rare) {
            continue;
          }
          found = true;
          break;
        }
      }
    }

    return found ? persona : null;
  }

  /**
     * Fuse a rare persona with a normal persona.
     * @param rarePersona The rare persona
     * @param mainPersona The normal persona
     * @returns The result persona, or null when the fusion is not possible.
     */
  private fuseRare(rarePersona: Persona, mainPersona: Persona): Persona {
    let modifier: number;
    this.dataService.getRareCombos(rarePersona, mainPersona).subscribe(n => modifier = n);
    let persona: Persona[];
    this.personaService.getPersonaByArcana(mainPersona.arcana).subscribe(ps => persona = ps);
    const mainPersonaIndex = persona.indexOf(mainPersona);
    let newPersona = persona[mainPersonaIndex + modifier];

    if (!newPersona) {
      return null;
    }

    if (newPersona.special) {
      if (modifier > 0) {
        modifier++;
      } else if (modifier < 0) {
        modifier--;
      }

      newPersona = persona[mainPersonaIndex + modifier];
    }
    return newPersona;
  }

  /**
 * Get all 2-fusion recipes with the given persona as one of the ingredients
 * @param persona The persona to fuse from
 * @returns {Recipe[]} The list of recipes. In each recipe's sources, the given persona
 * is guaranteed to be the first one.
 */
  public getAllResultingRecipesFrom(persona: Persona): Observable<Recipe[]> {
    const recipes: Recipe[] = [];
    this.personaService.getPersonas().subscribe(personas => {
      for (let i = 0; i < personas.length; i++) {
        const p = this.fuse(persona, personas[i]);
        if (p !== null) {
          const recipe = {
            sources: [persona, personas[i]],
            result: p
          };

          this.addRecipe(recipe, recipes, false);
        }
      }
    });

    return Observable.of(recipes);
  }

  /**
   * Add a recipe to a list of recipe. Before adding, add an estimated cost
   * to the recipe and sort the recipe's sources.
   * @param recipe The recipe to add
   * @param allRecipes List of recipes to add to
   * @param sortIngredients if true the ingredient list will be sorted
   */
  private addRecipe(recipe: Recipe, allRecipes: Recipe[], sortIngredients: boolean): void {
    // add an approximated cost
    recipe.cost = this.getApproxCost(recipe);

    if (sortIngredients) {
      // Sort ingredients so that highest level persona is first
      recipe.sources.sort((a, b) => b.level - a.level);
    }

    allRecipes.push(recipe);
  }

  private getApproxCost(recipe: Recipe): number {
    let cost = 0;
    for (let i = 0, source = null; source = recipe.sources[i]; i++) {
      const level = source.level;
      cost += (27 * level * level) + (126 * level) + 2147;
    }

    return cost;
  }

  /**
 * Get the list of all recipes for the given persona
 * @param persona The resulting persona
 * @returns {Array} List of all recipes for the given persona
 */
  public getRecipes(persona: Persona): Recipe[] {
    const allRecipe = [];
    // Rare persona can't be fused
    if (persona.rare) {
      return allRecipe;
    }

    // Check special recipes.
    if (persona.special) {
      return this.getSpecialRecipe(persona);
    }

    let recipes = this.getArcanaRecipes(persona.arcana);
    recipes = recipes.filter((value, index, array) => {
      return this.isGoodRecipe(value, persona);
    });
    for (let i = 0; i < recipes.length; i++) {
      this.addRecipe(recipes[i], allRecipe, true);
    }

    return allRecipe;
  }
  /**
 * Get the recipe for a special persona
 * @param persona The special persona
 * @returns {Array} An array of 1 element containing the recipe for the persona
 */
  private getSpecialRecipe(persona: Persona): Recipe[] {
    if (!persona.special) {
      throw new Error('Persona is not special!)');
    }
    const allRecipe = [];
    for (let i = 0; i < this.specialFusions.length; i++) {
      const combo = this.specialFusions[i];
      this.personaService.getPersonas().subscribe(personas => {
        if (persona.name === combo.result) {
          const recipe = {
            sources: [],
            result: personas[combo.result]
          };
          for (let j = 0; j < combo.sources.length; j++) {
            recipe.sources.push(personas[combo.sources[j]]);
          }
          this.addRecipe(recipe, allRecipe, true);
        }
      });
      return allRecipe;
    }
  }
  /**
 * Get all recipes that result in a persona in the given arcana
 * @param arcana The result arcana
 * @returns {Array} the list of recipes
 */
  private getArcanaRecipes(arcana: string): Recipe[] {
    const recipes: Recipe[] = [];
    this.dataService.getCombosByResult(arcana).subscribe(
      arcanaCombos => {
        // fuse 2 persona normally (including down-rank)
        for (let i = 0, combo = null; combo = arcanaCombos[i]; i++) {
          // todo: Check to make sure that this is what I was supposed to do
          const personae1 = arcanaCombos[combo.source[0]];
          const personae2 = arcanaCombos[combo.source[1]];
          for (let j = 0, persona1 = null; persona1 = personae1[j]; j++) {
            for (let k = 0, persona2 = null; persona2 = personae2[k]; k++) {
              // for same arcana fusion only consider k > j to avoid duplicates
              if (persona1.arcana === persona2.arcana && k <= j) {
                continue;
              }
              // rare fusion will be handled separately
              if ((persona1.rare && !persona2.rare) || (persona2.rare && !persona1.rare)) {
                continue;
              }
              const result = this.fuseNormal(persona1, persona2);
              if (!result) {
                continue;
              }
              recipes.push({
                sources: [persona1, persona2],
                result: result
              });
            }
          }
        }

        // rare fusion where one persona is a rare one and the other is a normal one
        for (let i = 0; i < this.rarePersona.length; i++) {
          this.personaService.getPersona(this.rarePersona[i]).subscribe(
            rarePersona => {
              this.personaService.getPersonaByArcana(arcana).subscribe(personas => {
                for (let j = 0; j < personas.length; j++) {
                  const mainPersona = personas[j];
                  if (rarePersona === mainPersona) {
                    continue;
                  }
                  const result = this.fuseRare(rarePersona, mainPersona);
                  if (!result) {
                    continue;
                  }
                  recipes.push({
                    sources: [rarePersona, mainPersona],
                    result: result
                  });
                }
              });
            });
        }
      }
    );

    return recipes;
  }

  /**
 * Return true if the given recipe is good for the expected result.
 * A recipe is good if the sources are different from the expected result,
 * and the actual result is the same as the expected result.
 * @param recipe The recipe to check
 * @param expectedResult The expected resulting persona
 * @returns {boolean} true if the recipe is good for the given persona, false otherwise
 */
  private isGoodRecipe(recipe: Recipe, expectedResult: Persona): boolean {
    if (recipe.sources[0].name === expectedResult.name) {
      return false;
    }
    if (recipe.sources[1].name === expectedResult.name) {
      return false;
    }
    return recipe.result.name === expectedResult.name;
  }
}
