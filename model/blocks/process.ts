import { Container } from "../container";
import { BlockType } from "./block";
import { ButtonGroup } from "./button-group";
import { HTML } from "./html";
import { YouTube } from "./youtube";

/**
 * A process block is a block that contains a series of steps. Only one step is visible at a time.
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
   * - ```completed``` means that all of the process containers are done.
   * - ```interacted``` means that the process controls were used.
   */
  doneCriteria?: "experienced" | "completed" | "interacted";

  /**
   * Steps of the process.
   *
   * There must be at least two steps.
   */
  steps: [Step, Step, ...Step[]];
}

/**
 * A step is a step of a process block.
 */
export interface Step extends Container {
  /**
   * Blocks of the step.
   *
   * There must be at least one block.
   */
  blocks: [...(HTML | YouTube | ButtonGroup)[], HTML | YouTube | ButtonGroup];
}
