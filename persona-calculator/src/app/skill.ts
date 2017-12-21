export class Skill {
    name?: string;
    cost?: number;
    effect: string;
    element: 'phys' | 'gun' | 'fire' | 'ice' | 'electric' | 'wind' | 'psy' | 'nuclear' | 'bless' | 'curse' |
        'almighty' | 'ailment' | 'support' | 'passive' | 'healing';
    personas: {
        [name: string]: number;
    };
    talk?: string;
    fuse?: string | string[];
    unique?: string;
    dlc?: boolean;
    note?: string;

    // for display in list
    elemDisplay?: string;
    costDisplay?: string;
    personaDisplay?: string;
    talkDisplay?: string;
    fuseDisplay?: string;
}
