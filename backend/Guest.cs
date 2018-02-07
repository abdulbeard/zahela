public class Guest{
	public GuestType Type {get;set;}
	public string FirstName {get;set;}
	public string LastName {get;set;}
	public RSVPStatus Status {get;set;}
	public FoodPreferences FoodPreferences {get;set;}
	public string ProfileLink {get;set;}
	public string Description {get;set;}
}

public class FoodPreferences{
	public string DietaryRestriction {get;set;}
	public string Allergies {get;set;}
}


[Flags]
public enum GuestType{
	MarcelasFriend,
	MarcelasFamily,
	ZaheersFriend,
	ZaheersFamily,
	ZaheerAndMarcelasFriend,
	AtlantaFriends,
	CollegeFriends,
	CloseCrew,
	PlanningCrew,
}

public enum RSVPStatus{
	Accepted,
	Declined
}