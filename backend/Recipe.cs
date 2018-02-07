public class Recipe{
	public string Name {get;set;}
	public RecipeDescription Description {get;set;}
	public List<Ingredient> Ingredients {get;set;}
	public List<string> EquipmentNeeded {get;set;}
	public List<Stage> Preparation {get;set;}
	public List<Stage> ActualCooking {get;set;}
}

public class RecipeDescription{
	public int PreparationTime {get;set;}
	public int ServesHowMany {get;set;}
	public string PortionSize {get;set;}
	public List<string> Tags {get;set;}
}

public class Ingredient{
	public string Name {get;set;}
	public string Url {get;set;}
	public int Amount {get;set;}
	public IngredientMeasure Measure {get;set;}
	public string Description {get;set;}//chopped, julienned etc.
	public string ExtraInfo {get;set;}
}

public enum IngredientMeasure{
	Tablespoon,
	Teaspoon,
	Pinch,
	Cup,
	Milliliter,
	Count,
}

public class Step{
	public string Instructions {get;set;}
}

public class Stage{
	public List<Step> Steps {get;set;}
}