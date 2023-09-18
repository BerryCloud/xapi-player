import { Activity } from "@berry-cloud/ngx-xapi";
import { Accordion } from "./accordion";
import { Audio } from "./audio";
import { ButtonGroup } from "./button-group";
import { Flashcard } from "./flashcard";
import { HTML } from "./html";
import { LabeledImage } from "./labeled-image";
import { Process } from "./process";
import { Questionnaire } from "./questionnaire";
import { Tabs } from "./tabs";
import { Video } from "./video";
import { YouTube } from "./youtube";

/**
 * A block is a unit of content. There are different types of blocks. Each block type has its own parameters.
 */
export type BlockType = {
  /**
   * The type of this block.
   */
  readonly type: string;

  /**
   * The activity of this block. If undefined, no statements about this block are sent to the LRS.
   */
  activity?: Activity;

  /**
   * The done criteria of this block. A block is considered _done_ when the criteria is met.
   *
   * Once a block is done it cannot be undone.
   *
   * If undefined, then the block is considered done.
   */
  doneCriteria?: "experienced" | "completed" | "interacted" | "passed";
};

/**
 * The known block types.
 */
export type Block =
  | Accordion
  | Audio
  | ButtonGroup
  | Flashcard
  | HTML
  | LabeledImage
  | Process
  | Questionnaire
  | Tabs
  | Video
  | YouTube;
