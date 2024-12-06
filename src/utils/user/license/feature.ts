export class Feature {
    // Free Trial Features
    public static readonly ThirtyDayAccess = new Feature(
      "30 Day Access to Premium",
      "Get 1 month of premium for free."
    );

    public static readonly NoCreditCard = new Feature(
      "No Credit Card Required",
      "Get started without a credit card."
    );

    public static readonly CancelAnytime = new Feature(
      "Cancel Any Time",
      "Cancel your membership at any time."
    );

    // Premium Features
    public static readonly ImageUpload = new Feature(
      "Image Upload",
      "Upload images to your account."
    );
  
    public static readonly CreateNotes = new Feature(
      "Create Notes",
      "Create notes and store them in your account."
    );
  
    // Enterprise Features
    public static readonly AICompose = new Feature(
      "AI Compose",
      "Compose notes using AI."
    );
  
    constructor(
      public name: string,
      public description: string
    ) {}
  }