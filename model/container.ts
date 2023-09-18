import { Activity, LanguageMap } from "@berry-cloud/ngx-xapi";
import { Block } from "./blocks/block";

/**
 * A collection of ordered `Block` objects.
 *
 * A container is considered _done_ when it is visible and all `Block` objects within `blocks` are done.
 *
 * Once a container is done it cannot be undone.
 *
 * The definition of visible is player implementation specific.
 */
export interface Container {
  /**
   * The name of the container.
   *
   * Used for presentation purposes in interfaces that extend container.
   */
  name?: LanguageMap;

  /**
   * The activity of the container.
   *
   * If undefined, no statements about the container are sent to the LRS.
   *
   * Note: The `activityId` in the `activity` might not be unique.
   */
  activity?: Activity;

  /**
   * `Block` objects of the container.
   *
   * There **must** be at least one `Block`.
   */
  blocks: [...Block[], Block];
}
