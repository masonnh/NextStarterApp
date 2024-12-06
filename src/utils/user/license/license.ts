import { Feature } from "./feature";

export class License {
  static readonly Free = new License(
    0, 
    "Free Trial", 
    "", 
    [Feature.ThirtyDayAccess, Feature.NoCreditCard, Feature.CancelAnytime], 
    100
  );
  static readonly Premium = new License(
    1,
    "Premium",
    "prod_RLTGri0uzIA3g4",
    [Feature.ImageUpload, Feature.CreateNotes],
    10000
  );
  static readonly Enterprise = new License(
    2,
    "Enterprise",
    "prod_RLTG6zMsuEfmrF",
    [Feature.ImageUpload, Feature.CreateNotes, Feature.AICompose],
    10000
  );

  static readonly ById = {
    [License.Free.id]: License.Free,
    [License.Premium.id]: License.Premium,
    [License.Enterprise.id]: License.Enterprise,
  };

  static readonly ByProductId = {
    [License.Free.productId]: License.Free,
    [License.Premium.productId]: License.Premium,
    [License.Enterprise.productId]: License.Enterprise,
  };

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly productId: string,
    public readonly features: Feature[],
    public readonly storage: number
  ) {}
}