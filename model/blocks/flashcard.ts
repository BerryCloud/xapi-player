import { LanguageMap } from "@berry-cloud/ngx-xapi";
import { Image } from "../image";
import { BlockType } from "./block";

/**
 * A flashcard block is a block that contains a number of cards.
 */
export interface Flashcard extends BlockType {
  /**
   * Type of the block.
   */
  readonly type: "flashcard";

  /**
   * Cards of the flashcard block.
   *
   * There **must** be at least one card.
   */
  cards: [Card, ...Card[]];
}

/**
 * A card of the cards in a flashcard block.
 */
export interface Card {
  /**
   * Front side of the card.
   */
  front: CardSide;

  /**
   * Back side of the card.
   */
  back: CardSide;
}

/**
 * A card side of a card.
 *
 * A card side must have at least one of the following properties: `text`, `description`, `image` or `audio`.
 */
export interface CardSide {
  /**
   * Text of the card side.
   */
  text?: LanguageMap;

  /**
   * Description of the card side.
   */
  description?: LanguageMap;

  /**
   * Image of the card side.
   */
  image?: Image;

  /**
   * Audio of the card side.
   */
  audio?: string;
}
