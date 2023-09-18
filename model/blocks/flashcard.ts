import { LanguageMap } from "@berry-cloud/ngx-xapi";
import { Image } from "../image";
import { BlockType } from "./block";

/**
 * A block that contains a number of cards which can be actioned to display alternative content.
 */
export interface Flashcard extends BlockType {
  /**
   * Type of the block.
   */
  readonly type: "flashcard";

  /**
   * @inheritdoc
   *
   * - ```experienced``` means that the block was visible to the learner.
   * - ```completed``` means that all of the cards were actioned.
   * - ```interacted``` means that at least one card was actioned.
   */
  doneCriteria?: "experienced" | "completed" | "interacted";

  /**
   * The cards of the flashcard block.
   *
   * There **must** be at least one card.
   *
   * The cards are displayed in the order they are defined.
   */
  cards: [Card, ...Card[]];
}

/**
 * A card with two sides of content which is alternated between when actioned.
 */
export interface Card {
  /**
   * The card side to initially display.
   */
  front: CardSide;

  /**
   * The reverse card side to display when the card is actioned.
   */
  back: CardSide;
}

/**
 * The content of a card side.
 *
 * A card side must have at least one of the following properties: `text`, `description`, `image` or `audio`.
 */
export interface CardSide {
  /**
   * The text of the card side.
   */
  text?: LanguageMap;

  /**
   * The description of the card side.
   */
  description?: LanguageMap;

  /**
   * The image of the card side.
   */
  image?: Image;

  /**
   * The audio of the card side.
   */
  audio?: string;
}
