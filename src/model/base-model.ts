abstract class BaseModel {
  public abstract save(): void
  public abstract delete(): void
  public abstract update(config: any): void
}

export default BaseModel
