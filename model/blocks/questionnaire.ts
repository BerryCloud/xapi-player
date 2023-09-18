import {
  Activity,
  InteractionType,
  LanguageMap,
} from "@berry-cloud/ngx-xapi/model";
import { BlockType } from "./block";

/**
 * A questionnaire is a block that contains a number of `QuestionnairePart` objects.
 *
 * A questionnaire is _passed_ when all the questionnaire parts with a
 * `passCriteria` meet their `passCriteria`.
 *
 * A questionnaire is _experienced_ when the first questionnaire part is
 * displayed.
 *
 * A questionnaire is _completed_ when the last questionnaire part is
 * _finished_.
 *
 * A questionnaire is _interacted_ when the learner answers at least one
 * question from the first questionnaire part.
 */
export interface Questionnaire extends BlockType {
  /**
   * Type of the block.
   */
  readonly type: "questionnaire";

  /**
   * @inheritdoc
   *
   * - `passed` means that the questionnaire is done when it is passed.
   *
   * - `experienced` means that the questionnaire is done when it is
   * experienced.
   *
   * - `completed` means that the questionnaire is done when it is completed.
   *
   * - `interacted` means that the questionnaire is done when it has been
   * interacted with.
   *
   * If the `doneCriteria` is `passed` there **must** be at least one
   * `QuestionnairePart` in the questionnaire with a `passCriteria`.
   */
  doneCriteria?: "passed" | "experienced" | "completed" | "interacted";

  /**
   * Allows the learner to review the questions and their answers.
   *
   * The review is only available when the questionnaire is completed.
   *
   * The answers cannot be changed during the review.
   */
  review?: boolean;

  /**
   * Number of attempts permitted for the questionnaire.
   *
   * The number of attempts **must** be greater than 0.
   *
   * If undefined the number of attempts is unlimited.
   *
   * Note: If the `doneCriteria` is `passed` and the learner reaches the
   * number of attempts without passing, the questionnaire cannot be
   * passed.
   */
  attempts?: number;

  /**
   * The first part of the questionnaire.
   */
  first: QuestionnairePart;

  /**
   * Settings of the feedback to display after the learner has completed
   * the questionnaire.
   *
   * The feedback will always include the:
   *
   * - number of attempts remaining if `attempts` is defined
   * - a review button if `review` is true
   * - a retry button if `attempts` is defined and the learner has attempts
   * - feedback for each questionnaire part that has feedback defined
   */
  feedback: {
    text: LanguageMap;
  };
}

/**
 * A questionnaire part contains a number of questions. A _scored questionnaire
 * part_ can have a conditional `next` `QuestionnairePart`.
 *
 * A scored questionnaire part has at least one question or answer with a
 * score.
 *
 * An _unscored questionnaire part_ has no questions or answers with a score.
 *
 * A scored questionnaire part with a `passCriteria` can be passed or failed.
 *
 * A scored questionnaire part without a `passCriteria` can only be scored.
 *
 * The last `QuestionnairePart` has an undefined `next` property or there is no
 *  `QuestionnairePart` defined for the learner's score.
 *
 * A questionnaire part is _finished_ when no more questions can be answered.
 *
 * No more questions can be answered when the learner has:
 *
 * - answered all of the questions in the questionnaire part
 * - answered the required number of questions as defined by the
 * `numberOfQuestions` property
 * - reached the time limit as defined by the `timeLimit` property
 */
interface QuestionnairePart {
  /**
   * The activity of the questionnaire part.
   *
   * If undefined, no statements about the questionnaire part are sent.
   */
  activity?: Activity;

  /**
   * Pass criteria of the questionnaire part.
   *
   * Only applicable if the questionnaire part is a scored questionnaire part.
   *
   * If undefined, the questionnaire part cannot be passed.
   */
  passCriteria?: {
    /**
     * Passing score of the questionnaire part.
     */
    score: number;

    /**
     * If true, the scoring is inverted. This means that the learner is required to score
     * less than or equal to the `score` property.
     * If false, the scoring is not inverted. This means that the learner is
     * required to score greater than or equal to the `score` property.
     */
    inverse?: boolean;
  };

  /**
   * The number of questions to ask. The questions are selected randomly.
   *
   * The number of question **must** be greater than 0 and **must not** be greater than the number of
   * questions in the questionnaire part.
   *
   * If undefined, all questions are asked and displayed in the order they are
   * defined in the `questions` array.
   */
  numberOfQuestions?: number;

  /**
   * Time limit of the questionnaire part in seconds.
   *
   * The time limit **must** be greater than 0.
   *
   * If undefined, there is no time limit.
   *
   * The time limit is measured from the time the learner starts the
   * questionnaire part.
   *
   * If the time limit is reached, the learner cannot answer any more questions
   * in the questionnaire part.
   *
   * Note: If the questionnaire `doneCriteria` is `passed` and the learner reaches time limit
   * without passing, the questionnaire part cannot be passed and the questionnaire cannot be
   * passed.
   */
  timeLimit?: number;

  /**
   * The configuration of the introduction which is displayed before the
   * learner starts the questionnaire part.
   *
   * The introduction will always include a start button.
   */
  introduction?: {
    /**
     * Text to display.
     */
    text?: LanguageMap;

    /**
     * If true, the pass criteria is displayed.
     *
     * Only applicable if `passCriteria` is defined.
     */
    showPassCriteria?: boolean;

    /**
     * If true, the number of questions that the learner is required to answer is displayed.
     */
    showNumberOfQuestions?: boolean;

    /**
     * If true, the time limit is displayed.
     *
     * Only applicable if `timeLimit` is defined.
     */
    showTimeLimit?: boolean;
  };

  /**
   * Settings of the questionnaire part feedback to display on the
   * questionnaire feedback.
   *
   * If undefined, no feedback is displayed for the questionnaire part.
   */
  feedback?: {
    /**
     * Text to display.
     */
    text?: LanguageMap;

    /**
     * If true, the score is displayed.
     *
     * Only applicable if the questionnaire part is a scored questionnaire part.
     */
    showScore?: boolean;

    /**
     * If true, a pass or fail icon is displayed.
     *
     * Only applicable if `passCriteria` is defined.
     */
    showIcon?: boolean;

    /**
     * A map for selecting text to display based on the learner's score.
     *
     * Only applicable if the questionnaire part is a scored questionnaire part.
     *
     * The `LanguageMap` with the highest `score` key that is less than or
     * equal to the learner's score is selected.
     *
     * If `passCriteria.inverse` is true, the `LanguageMap` with the lowest
     * `score` key that is greater than or equal to the learner's score is selected.
     *
     * If the selected value is `null`, no text is displayed.
     */
    scoreText?: {
      [score: number]: LanguageMap | null;
    };
  };

  /**
   * The questions of the questionnaire.
   *
   * There **must** be at least one question.
   */
  questions: [Question, ...Question[]];

  /**
   * A map for selecting a next questionnaire part based on the learner's score.
   *
   * Only applicable if the questionnaire part is a scored questionnaire part.
   *
   * If undefined, the learner is not directed to a next questionnaire part.
   *
   * The `QuestionnairePart` with the highest `score` key that is less than or
   * equal to the learner's score is selected.
   *
   * If `passCriteria.inverse` is true, the `QuestionnairePart` with the lowest
   * `score` key that is greater than or equal to the learner's score is selected.
   *
   * If the selected value is `null`, the learner is not directed to a next
   * questionnaire part.
   */
  next?: {
    [score: number]: QuestionnairePart | null;
  };
}

/**
 * A question within questionnaire part.
 */
export interface Question {
  /**
   * The ID of the question. If undefined then no statement is sent for the question.
   */
  id?: string;

  /**
   * The definition of the question.
   */
  definition: QuestionDefinition;
}

/**
 * The question text and feedback to display to the learner.
 */
export interface QuestionDefinition {
  /**
   * The human readable/visual name of the question.
   */
  name?: LanguageMap;

  /**
   * The question text.
   */
  description: LanguageMap;

  /**
   * The question feedback for the learner. When reviewed, the learner will always see their own response.
   */
  feedback?: {
    /**
     * If true, the question feedback is also shown to the learner immediately after answering the question.
     *
     * If `false`, the feedback is only shown to the learner when the questionnaire is reviewed.
     */
    immediate?: boolean;

    /**
     * If true, the correct answer is shown to the learner.
     *
     * Only applicable if:
     *
     * - `correctResponsePattern` is defined
     * - `immediate` is `true` or `Questionnaire.review` is `true`
     */
    showCorrectResponse?: boolean;

    /**
     * The feedback for the learner when the answer is correct.
     *
     * Only applicable if:
     *
     * - `correctResponsePattern` is defined
     * - `immediate` is `true` or `Questionnaire.review` is `true`
     */
    correctText?: LanguageMap;

    /**
     * The feedback for the learner when the answer is incorrect.
     *
     * Only applicable if:
     *
     * - `correctResponsePattern` is defined
     * - `immediate` is `true` or `Questionnaire.review` is `true`
     */
    incorrectText?: LanguageMap;

    /**
     * If true, an icon is shown to indicate if the learner's answer is correct or incorrect.
     *
     * Only applicable if:
     *
     * - `correctResponsePattern` is defined
     * - `immediate` is `true` or `Questionnaire.review` is `true`
     */
    successIcon?: boolean;

    /**
     * Text to display after answering the question.
     *
     * Only applicable if `immediate` is `true` or `Questionnaire.review` is `true`.
     */
    text?: LanguageMap;
  };

  /**
   * The type of question.
   */
  interactionType: InteractionType;

  /**
   * If true, the learner can select multiple options. If false, the learner can only select one option.
   */
  multipleChoice?: boolean;

  /**
   * Score of the question. Takes precedence over `QuestionInteractionComponent.score`.
   *
   * The question **must** have a `correctResponsePattern`.
   */
  score?: number;

  /**
   * A pattern representing the correct response to the interaction. The structure of the pattern
   * varies depending on `interactionType`.
   */
  correctResponsesPattern?: string[];

  /**
   * A pattern representing the exit response to the interaction. The structure of the pattern
   * varies depending on `interactionType`.
   *
   * If the learner's response matches the exit response, the remaining questions
   * in the questionnaire part are skipped.
   *
   * The response should be evaluated before skipping.
   */
  exitResponsesPattern?: string[];

  /**
   * A list of the options available if the `interactionType` is `choice` or `sequencing`.
   */
  choices?: QuestionInteractionComponent[];

  /**
   * A list of the options available if the `interactionType` is `likert`.
   */
  scale?: QuestionInteractionComponent[];

  /**
   * A list of the source options available if the `interactionType` is `matching`.
   */
  source?: QuestionInteractionComponent[];

  /**
   * A list of the target options available if the `interactionType` is `matching`.
   */
  target?: QuestionInteractionComponent[];

  /**
   * A list of the steps available if the `interactionType` is `performance`.
   */
  steps?: QuestionInteractionComponent[];
}

/**
 * The possible options a learner can choose for a question, depending on the `interactionType`.
 */
export interface QuestionInteractionComponent {
  /**
   * Identifies the interaction component within the list.
   */
  id: string;

  /**
   * A description of the choice.
   */
  description: LanguageMap;

  /**
   * Score for the choice. The score is overridden by the `QuestionDefinition.score` property.
   */
  score?: number;
}
