import { Activity, LanguageMap } from "@berry-cloud/ngx-xapi";
import { Container } from "./container";

/**
 * A collection of ordered `PathContainer` objects.
 *
 * A path is considered _done_ when the `containers` are done.
 */
export interface Path {
  /**
   * The ID of the path.
   */
  id: PathId;

  /**
   * The name of the path.
   *
   * If defined, the path will be displayed to the learner in the navigation.
   *
   * If undefined, the path will not be displayed to the learner in the navigation.
   */
  name?: LanguageMap;

  /**
   * The activity of the path.
   *
   * If undefined, no statements about the path will be sent to the LRS.
   */
  activity?: Activity;

  /**
   * The ordered `PathContainer` objects within the path.
   *
   * There **must** be at least one `PathContainer`.
   */
  containers: [...PathContainer[], PathContainer];
}

/**
 * A container that can be used in a path.
 */
export interface PathContainer extends Container {
  /**
   * The ID of the container.
   */
  readonly id: PathContainerId;
  /**
   * The container name to show in the navigation if the path is displayed.
   */
  name: LanguageMap;

  /**
   * If true, the `Unit` will be considered complete when the container is done.
   */
  complete?: boolean;
}

/**
 * A path container that completes the unit.
 */
export interface PathCompletedContainer extends PathContainer {
  /**
   * If true, the unit will be considered complete when the container is done.
   */
  completed: true;
}

/**
 * Human readable ID. May only contain characters that are allowed in a URI but do not have a reserved purpose (as defined in RFC 3986).
 */
export type PathId = `paths/${string}`;

/**
 * An ID used to identify a container within a path.
 *
 * The ID:
 * - **must** be unique in the unit.
 * - is immutable so it can be used as a key.
 * - **must** be URL friendly.
 */
export type PathContainerId = `containers/${string}`;
