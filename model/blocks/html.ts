import { BlockType } from "./block";

/**
 * A block that displays HTML content.
 */
export interface HTML extends BlockType {
  /**
   * Type of the block.
   */
  readonly type: "html";

  /**
   * @inheritdoc
   *
   * ```experienced``` means that the block was visible to the learner.
   */
  doneCriteria?: "experienced";

  /**
   * URL of the content.
   */
  url: string;
}
