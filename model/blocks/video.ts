import { BlockType } from "./block";

/**
 * A Video block.
 */
export interface Video extends BlockType {
  /**
   * Type of the block.
   */
  readonly type: "video";

  /**
   * @inheritdoc
   *
   * - ```experienced``` means that the block was visible to the learner.
   * - ```completed``` means that the video reached the end.
   * - ```interacted``` means that the video controls were used.
   */
  doneCriteria?: "experienced" | "completed" | "interacted";

  /**
   * URL of the video.
   */
  url: string;

  // TODO add relevant HTML 5 video options (such as seek disabled, etc.)
}
