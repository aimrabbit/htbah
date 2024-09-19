/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class HowToBeAHeroActor extends Actor {
    /** @override */
    prepareData() {
        // Prepare data for the actor. Calling the super version of this executes
        // the following, in order: data reset (to clear active effects),
        // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
        // prepareDerivedData().
        super.prepareData();
    }

    /** @override */
    prepareBaseData() {
        // Data modifications in this step occur before processing embedded
        // documents or derived data.
    }

    /**
     * @override
     * Augment the actor source data with additional dynamic data. Typically,
     * you'll want to handle most of your calculated/derived data in this step.
     * Data calculated in this step should generally not exist in template.json
     * (such as ability modifiers rather than ability scores) and should be
     * available both inside and outside of character sheets (such as if an actor
     * is queried and has a roll executed directly from it).
     */
    prepareDerivedData() {
        const actorData = this;
        const systemData = actorData.system;
        const flags = actorData.flags.howtobeahero || {};

        // Make separate methods for each Actor type (character, npc, etc.) to keep
        // things organized.
        this._prepareActorData(actorData);
        this._prepareCharacterData(actorData);
        this._prepareNpcData(actorData);
    }

    /**
     * Prepare Actor base data
     */
    _prepareActorData(actorData) {
        // Make modifications to data here. For example:
        const systemData = actorData.system;
        // Loop through skillsets to set the skillset value, eureka points and calculate the final skill value
        for (let [key, skillSet] of Object.entries(systemData)) {
            let totalSkillValue = 0;
            for (let skill of skillSet.skills) {
                totalSkillValue += skill.baseValue;
            }
            skillSet.value = totalSkillValue / 10;
            skillSet.eureka.max = totalSkillValue / 100;
            for (let skill of skillSet.skills) {
                skill.value = skill.baseValue + skillSet.value
            }
        }
    }

    /**
     * Prepare Character type specific data
     */
    _prepareCharacterData(actorData) {
        if (actorData.type !== 'character') return;

        // Make modifications to data here. For example:
        const systemData = actorData.system;
    }

    /**
     * Prepare NPC type specific data.
     */
    _prepareNpcData(actorData) {
        if (actorData.type !== 'npc') return;

        // Make modifications to data here. For example:
        const systemData = actorData.system;
        // systemData.xp = systemData.cr * systemData.cr * 100;
    }

    /**
     * Override getRollData() that's supplied to rolls.
     */
    getRollData() {
        // Starts off by populating the roll data with a shallow copy of `this.system`
        const data = {...this.system};

        // Prepare character roll data.
        this._getActorRollData()
        this._getCharacterRollData(data);
        this._getNpcRollData(data);

        return data;
    }

    /**
     * Prepare actor roll data.
     */
    _getActorRollData(data) {
        // Process additional Actor data here.

    }

    /**
     * Prepare character roll data.
     */
    _getCharacterRollData(data) {
        if (this.type !== 'character') return;
        // Process additional Character data here.
    }

    /**
     * Prepare NPC roll data.
     */
    _getNpcRollData(data) {
        if (this.type !== 'npc') return;
        // Process additional NPC data here.
    }
}
