export class Recipe {
    constructor(id: string, name: string, description: RecipeDescription, ingredients: Array<Ingredient>,
        equipment: Array<string>, prep: Array<Stage>, cooking: Array<Stage>,
        source: string, origin: string, realId: string = "") {
        this.Name = name;
        this.Description = description;
        this.Ingredients = ingredients;
        this.EquipmentNeeded = equipment;
        this.Preparation = prep;
        this.ActualCooking = cooking;
        this.Source = source;
        this.Origin = origin;
        this.Id = id;
        this.RealId = realId;
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
    public RealId: string;

    static fromJson(json: string): Recipe{
        var obj = JSON.parse(json);
        var result =    new Recipe(obj.Id || "", obj.Name || "", 
                new RecipeDescription(obj.Description.Images || [],
                    obj.Description.PreparationTime || "",
                    obj.Description.ServesHowMany || "",
                    obj.Description.PortionSize || "",
                    obj.Description.Tags || [],
                    obj.Description.Text || ""),
                    [],
                    obj.EquipmentNeeded || Array.of(""),
                    obj.Preparation || Array.of(new Stage("", Array.of(new Step("")))),
                    obj.ActualCooking || Array.of(new Stage("", Array.of(new Step("")))),
                    obj.Source || "", 
                    obj.Origin || ""
                );
        if(obj.Ingredients){
            for(var i=0; i < obj.Ingredients.length; i++){
                var objIngr = obj.Ingredients[i];
                result.Ingredients.push(new Ingredient(objIngr.Name, objIngr.Url, objIngr.Amount, objIngr.Measure, objIngr.Description, objIngr.ExtraInfo));
            }
        }
        return result;
    }
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

    public getUrl(): string {
        return this.Url.startsWith('http') ? this.Url : `http://${this.Url}`;
    }
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
    constructor(name: string, steps: Array<Step>) {
        this.Name = name;
        this.Steps = steps;
    }
    public Name: string;
    public Steps: Array<Step>;
}