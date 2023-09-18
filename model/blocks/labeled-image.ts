import { LanguageMap } from "@berry-cloud/ngx-xapi";
import { BlockType } from "./block";

/**
 * A image with positioned icons which each display text when actioned.
 */
export interface LabeledImage extends BlockType {
  /**
   * The type of the block.
   */
  readonly type: "labeled-image";

  /**
   * @inheritdoc
   *
   * - ```experienced``` means that the block was visible to the learner.
   * - ```completed``` means that the number of labels which have been opened is at least `minimumLabelsOpened`.
   * - ```interacted``` means that at least one label was opened.
   */
  doneCriteria: "experienced" | "completed" | "interacted";

  /**
   * The minimum number of `Label` objects required to be opened in order for the block to be considered done.
   *
   * Only applicable if `doneCriteria` is `completed`.
   *
   * **Must** be greater than 0 and **must not** be greater than the size of the `labels` array.
   *
   * If undefined, then the block is considered done when all the `Label` objects have been opened.
   */
  minimumLabelsOpened?: number;

  /**
   * The URL of the background image.
   */
  image: string;

  /**
   * The labels to display on the image.
   *
   * There **must** be at least one label.
   */
  labels: [label, ...label[]];
}

export interface label {
  /**
   * The name to display when the label is opened.
   */
  name: LanguageMap;

  /**
   * The description to display when the label is opened.
   */
  description: LanguageMap;

  /**
   * The x coordinate of the label.
   *
   * **Must** be greater than 0 and **must not** be greater than 100.
   */
  x: number;

  /**
   * The y coordinate of the label.
   *
   * **Must** be greater than 0 and **must not** be greater than 100.
   */
  y: number;
}
