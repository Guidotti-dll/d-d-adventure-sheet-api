# 🏛️ D&D System Entities

Domain and entity structure following **Clean Architecture** for D&D 5e character sheet management.

## 📁 Domain Structure

```
src/1-domain/entities/
├── shared/              # Shared enumerations
│   └── enums/
│       ├── AlignmentEnum
│       ├── AttributeEnum
│       ├── DifficultyEnum
│       ├── SchoolEnum
│       ├── ProfileEnum
│       ├── CampaignStatusEnum
│       ├── StatusEnum
│       ├── SizeEnum
│       ├── EncounterTypeEnum
│       └── ItemTypeEnum
├── auth/                # Authentication and recovery
│   ├── PasswordRecoveryTokenEntity
├── users/               # Users
│   └── UserEntity
├── character/           # Character sheet
│   ├── CharacterEntity        # Main aggregate
│   ├── AttributeEntity        # Composition
│   ├── AppearanceEntity       # Composition
│   ├── InventoryEntity        # Composition
│   ├── InventoryItemEntity
│   ├── SpellSlotEntity        # Composition
│   ├── SpellbookEntity        # Composition
│   ├── CharacterProficiencyEntity
│   ├── CampaignJournalEntity
│   └── RollHistoryEntity
├── compendium/          # D&D Reference (maintained by Admin)
│   ├── RaceEntity
│   ├── SubRaceEntity
│   ├── RacialTraitEntity
│   ├── RacialBonusValue
│   ├── ClassEntity
│   ├── ClassFeatureEntity
│   ├── BackgroundEntity
│   ├── ProficiencyEntity
│   ├── SpellEntity
│   └── ItemEntity
└── campaign/            # Campaigns and sessions
    ├── CampaignEntity         # Aggregate
    ├── SessionEntity
    ├── EncounterEntity
    └── ParticipationEntity
```

## 🎯 Main Domains

### **User** 👤
- `UserEntity`: Represents system users (PLAYER, DUNGEON_MASTER, ADMIN)
- `PasswordRecoveryTokenEntity`: Manages password recovery tokens with expiration and validation

### **Character** 🧙
Main aggregate for D&D 5e character sheet with the following compositions:

- **CharacterEntity**: Core character data (name, class, race, background, level, HP, etc.)
- **AttributeEntity**: Six abilities (STR, DEX, CON, INT, WIS, CHA) with modifiers
- **AppearanceEntity**: Physical description (age, height, weight, hair color, etc.)
- **InventoryEntity**: Carrying capacity management and gold tracking
  - **InventoryItemEntity**: Individual items with type, weight, rarity, and equipped status
- **SpellSlotEntity**: Spell slot tracking by spell level (0-9)
- **SpellbookEntity**: Collection of known spells and cantrips
- **CharacterProficiencyEntity**: Skills, saving throws, and other proficiencies
- **CampaignJournalEntity**: Per-campaign character notes and memories
- **RollHistoryEntity**: Tracking of dice rolls for analysis and history

### **Compendium** 📖
Reference catalog (immutable, maintained by Admin):

**Races:**
- **RaceEntity**: Base race with speed, ability bonuses, and available subraces
- **SubRaceEntity**: Race variants with specific traits
- **RacialTraitEntity**: Special abilities from race/subrace selection

**Classes:**
- **ClassEntity**: Character class with hit dice, primary attribute, and features
- **ClassFeatureEntity**: Class-specific features unlocked at specific levels

**References:**
- **BackgroundEntity**: Character background with skill proficiencies and equipment
- **ProficiencyEntity**: Skill, saving throw, weapon, armor, and tool proficiencies
- **SpellEntity**: Spell data with level, school, casting time, range, components, duration
- **ItemEntity**: Equipment and items with type, rarity, weight, and attunement status

### **Campaign** 🎲
Managed by Dungeon Master:

- **CampaignEntity**: Campaign container with DM, setting, status (PLANNING, ONGOING, PAUSED, COMPLETED, CANCELLED)
- **SessionEntity**: Individual game sessions with date, duration, and summary
- **EncounterEntity**: Combat and non-combat encounters with difficulty and XP rewards
- **ParticipationEntity**: Character participation in campaigns with join/leave tracking

## 🔗 Main Relationships

### Composition (strong aggregation)
```
Character ─── 1:1 ─── Attribute
           ─── 1:1 ─── Appearance
           ─── 1:1 ─── Inventory
           ─── 1:* ─── SpellSlot
           ─── 1:1 ─── Spellbook
           ─── 1:* ─── CharacterProficiency
           ─── 1:* ─── CampaignJournal
           ─── 1:1 ─── RollHistory
```

### Association
```
User ─── 1:* ─── Character
User ─── 1:* ─── Campaign (DungeonMaster)
Character ─── 1:* ─── Campaign (via Participation)
Campaign ─── 1:* ─── Session
Session ─── 1:* ─── Encounter
Encounter ─── *:* ─── Character (participants)
```

### D&D Reference
```
Race ─── 1:* ─── SubRace
     ─── 1:* ─── RacialBonus
     ─── 0..* ─── RacialTrait

Class ─── 1:* ─── ClassFeature
      ─── 1:* ─── Proficiency
```

## 💡 Patterns Used

### Entity Structure
All entities extend `AbstractEntity<T>` providing:
- `props`: Immutable data container
- `export()`: Returns shallow copy of props
- `exportJson()`: Returns JSON string representation

### Entity Creation
```typescript
// Create new entity
const result = UserEntity.create({
  name: "John",
  email: "john@example.com",
  password: "hashed_password"
})

// Load existing entity from DB
const user = UserEntity.fromExisting(databaseRow)
```

### Key Patterns
- ✅ **Value Objects**: Attribute, Appearance
- ✅ **Aggregates**: Character, Campaign, Race
- ✅ **Entities**: User, Proficiency, Item, Spell
- ✅ **Enums**: Centralized in `shared/enums`
- ✅ **Immutability**: IDs are always `readonly`
- ✅ **Business Logic**: Methods like `takeDamage()`, `levelUp()`, `addSpell()`
- ✅ **Functional Updates**: Return new instances instead of mutations
- ✅ **Either Pattern**: All creation methods return `Either<IError, Entity>`

### Common Methods

#### Character Methods
- `gainExperience(amount)`: Add XP towards next level
- `levelUp()`: Increase level and recalculate proficiency bonus
- `takeDamage(amount)`: Reduce HP (min 0)
- `heal(amount)`: Restore HP (max maxHP)
- `isAlive()`: Check if HP > 0

#### Attribute Methods
- `getModifier(attribute)`: Get ability modifier
- `updateScore(attribute, score)`: Update ability score and recalculate modifier

#### Inventory Methods
- `canAddWeight(weight)`: Check if item fits
- `updateWeight(weight)`: Update current weight

#### Spellbook Methods
- `addSpell(spell)`: Add spell to spellbook
- `removeSpell(spellId)`: Remove spell from spellbook
- `getSpellsByLevel(level)`: Filter spells by level

#### Campaign Methods
- `start()`: Change status to ONGOING
- `pause()`: Change status to PAUSED
- `complete()`: Change status to COMPLETED
- `cancel()`: Change status to CANCELLED
- `isActive()`: Check if campaign is ongoing

#### Participation Methods
- `leave()`: Mark character as left campaign
- `rejoin()`: Mark character as active again

## 🚀 Usage Examples

```typescript
// Create a new character
const characterResult = CharacterEntity.create({
  userId: "user-123",
  name: "Aragorn",
  raceId: "human",
  classId: "ranger",
  backgroundId: "ranger",
  maxHealthPoints: 10,
  armorClass: 16,
  alignment: AlignmentEnum.NEUTRAL_GOOD
})

// Chain entity operations
if (characterResult.isRight()) {
  const character = characterResult.value
  const damagedCharacter = character.takeDamage(3)
  const healedCharacter = damagedCharacter.heal(2)
}

// Create inventory item
const swordResult = InventoryItemEntity.create({
  name: "Longsword",
  description: "A standard longsword",
  type: ItemTypeEnum.WEAPON,
  quantity: 1,
  weight: 3,
  rarity: "common",
  value: 15
})

const sword = swordResult.value.equip()

// Manage campaign
const campaign = CampaignEntity.create({
  dungeonMasterId: "dm-123",
  name: "Lost Mines of Phandalin",
  description: "A classic adventure...",
  setting: "Forgotten Realms"
}).value

const activeCharacters = participation
  .filter(p => p.props.active)
  .map(p => p.props.characterId)
```

## 📋 Enumerations

### StatusEnum
- `ACTIVE`: Resource is active
- `INACTIVE`: Resource is inactive
- `DELETED`: Resource is deleted (soft delete)

### AlignmentEnum (9 combinations)
- `LAWFUL_GOOD`, `NEUTRAL_GOOD`, `CHAOTIC_GOOD`
- `LAWFUL_NEUTRAL`, `TRUE_NEUTRAL`, `CHAOTIC_NEUTRAL`
- `LAWFUL_EVIL`, `NEUTRAL_EVIL`, `CHAOTIC_EVIL`

### AttributeEnum
- `STRENGTH`, `DEXTERITY`, `CONSTITUTION`
- `INTELLIGENCE`, `WISDOM`, `CHARISMA`

### CampaignStatusEnum
- `PLANNING`: Campaign not yet started
- `ONGOING`: Campaign in progress
- `PAUSED`: Campaign temporarily halted
- `COMPLETED`: Campaign finished successfully
- `CANCELLED`: Campaign abandoned

### EncounterTypeEnum
- `COMBAT`: Battle encounter
- `SOCIAL`: Social interaction encounter
- `EXPLORATION`: Exploration encounter
- `PUZZLE`: Puzzle encounter
- `BOSS`: Boss battle encounter

### ItemTypeEnum
- `WEAPON`, `ARMOR`, `SHIELD`
- `POTION`, `SCROLL`, `WONDROUS`
- `CONSUMABLE`, `AMMUNITION`, `TREASURE`

### DifficultyEnum
- `EASY`, `MEDIUM`, `HARD`, `DEADLY`

### SchoolEnum (Magic Schools)
- `ABJURATION`, `CONJURATION`, `DIVINATION`
- `ENCHANTMENT`, `EVOCATION`, `ILLUSION`
- `NECROMANCY`, `TRANSMUTATION`

### SizeEnum
- `TINY`, `SMALL`, `MEDIUM`, `LARGE`, `HUGE`, `GARGANTUAN`
