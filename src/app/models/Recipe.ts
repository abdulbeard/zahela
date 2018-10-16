export class Recipe {
    constructor(id: string, name: string, description: RecipeDescription, ingredients: Array<Ingredient>,
        equipment: Array<string>, prep: Array<Stage>, cooking: Array<Stage>,
        source: string, origin: string) {
        this.Name = name;
        this.Description = description;
        this.Ingredients = ingredients;
        this.EquipmentNeeded = equipment;
        this.Preparation = prep;
        this.ActualCooking = cooking;
        this.Source = source;
        this.Origin = origin;
        this.Id = id;
    }
    public Name: string;
    public Description: RecipeDescription;
    public Ingredients: Array<Ingredient>;
    public EquipmentNeeded: Array<string>;
    public Preparation: Array<Stage>;
    public ActualCooking: Array<Stage>;
    public Source: string;
    public Origin: string;
    public Id: string;
}

export class RecipeDescription {
    constructor(images: Array<string>, prepTime: string, serves: string, portionSize: string, tags: Array<string>, text: string) {
        this.Images = images;
        this.PreparationTime = prepTime;
        this.ServesHowMany = serves;
        this.PortionSize = portionSize;
        this.Tags = tags;
        this.Text = text;
    }
    public Images: Array<string>;
    public PreparationTime: string;
    public ServesHowMany: string;
    public PortionSize: string;
    public Tags: Array<string>;
    public Text: string;
}

export class Ingredient {
    constructor(name: string, url: string, amount: number, measure: IngredientMeasure,
        description: string, extraInfo: string) {
        this.Name = name;
        this.Url = url;
        this.Amount = amount;
        this.Measure = measure;
        this.Description = description;
        this.ExtraInfo = extraInfo;
    }
    public Name: string;
    public Url: string;
    public Amount: number;
    public Measure: IngredientMeasure;
    public Description: string;
    public ExtraInfo: string;
    public getTitle(): string {
        return `${this.Amount} ${IngredientMeasure[this.Measure]}`;
    }
    public getAbbreviatedMeasure(): string {
        switch (this.Measure) {
            case IngredientMeasure.Count: { return "count"; }
            case IngredientMeasure.Milliliter: { return "ml"; }
            case IngredientMeasure.Cup: { return "cup"; }
            case IngredientMeasure.Pinch: { return "pinch"; }
            case IngredientMeasure.Teaspoon: { return "tsp"; }
            case IngredientMeasure.Tablespoon: { return "tbs"; }
            default: { return this.Measure; }
        }
    }
}

export enum IngredientMeasure {
    Tablespoon,
    Teaspoon,
    Pinch,
    Cup,
    Milliliter,
    Count,
}

export class Step {
    constructor(instructions: string) {
        this.Instructions = instructions;
    }
    public Instructions: string;
}

export class Stage {
    constructor(steps: Array<Step>) {
        this.Steps = steps;
    }
    public Steps: Array<Step>;
}