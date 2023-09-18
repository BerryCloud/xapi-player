import { Container } from "../container";
import { BlockType } from "./block";
import { ButtonGroup } from "./button-group";
import { HTML } from "./html";
import { YouTube } from "./youtube";

/**
 * A series of steps which **may** contain `HTML`, `YouTube` or `ButtonGroup` blocks, where only one step is visible at a time.
 */
export interface Process extends BlockType {
  /**
   * Type of the block.
   */
  readonly type: "process";

  /**
   * @inheritdoc
   *
   * - ```experienced``` means that the block was visible to the learner.
   * - ```completed``` means that all of the `Step` containers are done.
   * - ```interacted``` means that the process controls were used.
   */
  doneCriteria?: "experienced" | "completed" | "interacted";

  /**
   * The steps of the block.
   *
   * There **must** be at least two steps.
   *
   * The steps are displayed in the order they are defined.
   */
  steps: [Step, Step, ...Step[]];
}

/**
 * A collection of ordered `Block` objects of type `HTML`, `YouTube` and `ButtonGroup`.
 *
 * A step is considered done when the blocks of the step are done. It cannot be done until it is visible.
 */
export interface Step extends Container {
  /**
   * Blocks of the step.
   *
   * There **must** be at least one block.
   */
  blocks: [...(HTML | YouTube | ButtonGroup)[], HTML | YouTube | ButtonGroup];
}
