import { BlockType } from "./block";

/**
 * A block which displays a YouTube video player and loads a YouTube video.
 */
export interface YouTube extends BlockType {
  /**
   * The type of the block.
   */
  readonly type: "youtube";

  /**
   * @inheritdoc
   *
   * - ```experienced``` means that the YouTube video player was visible to the learner.
   * - ```completed``` means that the YouTube video reached the end.
   * - ```interacted``` means that the YouTube video player controls were used.
   */
  doneCriteria?: "experienced" | "completed" | "interacted";

  /**
   *  The YouTube video ID that identifies the video that the player will load.
   */
  videoId: string;

  // TODO add relevant YouTube Player component options (such as seek disabled, etc.)
}
