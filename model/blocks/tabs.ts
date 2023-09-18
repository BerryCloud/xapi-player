import { LanguageMap } from "@berry-cloud/ngx-xapi";
import { Container } from "../container";
import { BlockType } from "./block";
import { HTML } from "./html";
import { YouTube } from "./youtube";

/**
 * A series of tabs which **may** contain `HTML` or `YouTube` blocks, where single tab is always visible.
 */
export interface Tabs extends BlockType {
  /**
   * Type of the block.
   */
  readonly type: "tabs";

  /**
   * @inheritdoc
   *
   * - ```experienced``` means that the block was visible to the learner.
   * - ```completed``` means that the number of tabs which are done is at least `minimumTabsDone`.
   * - ```interacted``` means that at least one other tab was opened.
   */
  doneCriteria?: "experienced" | "completed" | "interacted";

  /**
   * The minimum number of `Tab` containers that are required to be done in order for the block to be considered done.
   *
   * Only applicable if `doneCriteria` is `completed`.
   *
   * **Must** be greater than 0 and **must not** be greater than the size of the `tabs`
   * array.
   *
   * If undefined, then the block is considered done when all the `Tab` containers are done.
   */
  minimumTabsDone?: number;

  /**
   * The tab containers of the block.
   *
   * There **must** be at least one tab.
   *
   * The tabs are displayed in the order they are defined.
   *
   */
  tabs: [Tab, ...Tab[]];
}

/**
 * A collection of ordered `Block` objects of type `HTML` and `YouTube`.
 *
 * A tab is considered done when the blocks of the tab are done. It cannot be done until it is visible.
 */
export interface Tab extends Container {
  /**
   * The name of the tab.
   */
  name: LanguageMap;

  /**
   * the blocks of the tab.
   *
   * There **must** be at least one block.
   */
  blocks: [...(HTML | YouTube)[], HTML | YouTube];
}
