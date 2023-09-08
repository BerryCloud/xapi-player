import { LanguageMap } from "@berry-cloud/ngx-xapi";
import { Container } from "../container";
import { BlockType } from "./block";
import { HTML } from "./html";
import { YouTube } from "./youtube";

/**
 * A tabs block is a block that contains a series of tabs. A single tab is always visible.
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
   * - ```completed``` means that the minimum number of tabs have been done.
   * - ```interacted``` means that at least one other tab was opened.
   */
  doneCriteria?: "experienced" | "completed" | "interacted";

  /**
   * Minimum number of tabs that must be done in order for the block to be considered done.
   *
   * Only applicable if doneCriteria is completed.
   *
   * The minimumTabsDone should not be greater than the number of tabs.
   *
   * If less than 2 the block is considered done when the block is experienced.
   *
   * If undefined, then the block is considered done when all the tabs are done.
   */
  minimumTabsDone?: number;

  /**
   * The tabs.
   *
   * There must be at least one tab.
   *
   * The tabs are shown in the order they are defined.
   *
   */
  tabs: [TabContainer, ...TabContainer[]];
}

/**
 * A tab.
 */
export interface TabContainer extends Container {
  /**
   * The name of this tab.
   */
  name: LanguageMap;

  /**
   * The blocks of this tab.
   *
   * There must be at least one block.
   */
  blocks: [...(HTML | YouTube)[], HTML | YouTube];
}
