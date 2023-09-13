import {
  Activity,
  InteractionType,
  LanguageMap,
} from "@berry-cloud/ngx-xapi/model";
import { BlockType } from "./block";

/**
 * A questionnaire is a block that contains a number of questionnaire parts.
 *
 * A questionnaire is 'passed' when all the questionnaire parts with a
 * passCriteria meet their passCriteria.
 *
 * A questionnaire is 'experienced' when the first questionnaire part is
 * displayed.
 *
 * A questionnaire is 'completed' when the 'last questionnaire part' is
 * 'finished'.
 *
 * A questionnaire is 'interacted' when the learner answers at least one
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
   * - `passed` means that the questionnaire is done when it is 'passed'.
   *
   * - `experienced` means that the questionnaire is done when it is
   * 'experienced'.
   *
   * - `completed` means that the questionnaire is done when it is 'completed'.
   *
   * - `interacted` means that the questionnaire is done when it has been
   * 'interacted' with.
   *
   * If the doneCriteria is `passed` there **must** be at least one
   * questionnaire part in the questionnaire with a passCriteria.
   */
  doneCriteria?: "passed" | "experienced" | "completed" | "interacted";

  /**
   * Allows the learner to review the questions and their answers.
   *
   * The review is only available when the questionnaire is 'completed'.
   *
   * The answers cannot be changed during the review.
   */
  review?: boolean;

  /**
   * Number of attempts permitted for this questionnaire.
   *
   * The number of attempts **must** be greater than 0.
   *
   * If undefined the number of attempts is unlimited.
   *
   * Note: If the `doneCriteria` is `passed` and the learner reaches the
   * maximum number of attempts without passing, the questionnaire cannot be
   * 'passed'.
   */
  attempts?: number;

  /**
   * The first questionnaire part of this questionnaire.
   */
  first: QuestionnairePart;

  /**
   * Settings of the feedback to display after the learner has 'completed'
   * the questionnaire.
   *
   * The feedback will always include the:
   *
   * - number of attempts remaining
   * - feedback for each questionnaire part
   */
  feedback: {
    text: LanguageMap;
  };
}

/**
 * A questionnaire part contains a number of questions. A 'scored questionnaire
 * part' can have a conditional next questionnaire part.
 *
 * A 'scored questionnaire part' has at least one question or answer with a
 * score.
 *
 * An 'unscored questionnaire part' has no questions or answers with a score.
 *
 * A 'scored questionnaire part' with a pass criteria can be passed or failed.
 *
 * A 'scored questionnaire part' without a pass criteria can only be scored.
 *
 * A 'last questionnaire part' has an undefined next property or there is no
 * next questionnaire part to display for the learner's score.
 *
 * A questionnaire part is 'finished' when no more questions can be answered.
 *
 * No more questions can be answered when the learner has:
 *
 * - answered all of the questions in the questionnaire part
 * - answered the required number of questions as defined by the
 * numberOfQuestions property
 * - reached the time limit as defined by the timeLimit property
 */
interface QuestionnairePart {
  /**
   * The activity of this questionnaire part.
   *
   * If undefined, no statements about this questionnaire part are sent.
   */
  activity?: Activity;

  /**
   * Pass criteria of this questionnaire part.
   */
  passCriteria?: {
    /**
     * Passing score of this questionnaire.
     */
    score: number;

    /**
     * If true the scoring is inverted, this means that the learner must score
     * less than or equal to the passing score. If false the scoring is not
     * inverted, this means that the learner must score greater than or equal
     * to the passing score.
     */
    inverse?: boolean;
  };

  /**
   * The number of questions to ask. The questions are selected randomly.
   *
   * Must be greater than 0 and must not be greater than the number of
   * questions in the questionnaire part.
   *
   * If undefined, all questions are asked.
   */
  numberOfQuestions?: number;

  /**
   * Time limit of this questionnaire part in seconds.
   *
   * The time limit **must** be greater than 0.
   *
   * If undefined, there is no time limit.
   *
   * The time limit is measured from the time the learner starts the
   * questionnaire part.
   *
   * If the time limit is reached the learner cannot answer any more questions
   * in this questionnaire part.
   *
   * Note: If the doneCriteria is `passed` and the learner reaches time limit
   * without passing, the questionnaire part cannot be passed.
   */
  timeLimit?: number;

  /**
   * The introduction configuration. The introduction is displayed before the
   * learner starts the questionnaire part.
   */
  introduction?: {
    /**
     * Text to display.
     */
    text?: LanguageMap;

    /**
     * If true, the pass criteria is displayed.
     */
    passCriteria?: boolean;

    /**
     * Display the number of questions that the learner must answer.
     */
    numberOfQuestions?: boolean;

    /**
     * If true, the time limit is displayed.
     */
    timeLimit?: boolean;
  };

  /**
   * Settings of the feedback for this questionnaire part to display on the
   * questionnaire feedback.
   */
  feedback?: {
    /**
     * Text to display.
     */
    text?: LanguageMap;

    /**
     * If true, the score is displayed.
     */
    score?: boolean;

    /**
     * If true, a pass or fail icon is displayed.
     */
    icon?: boolean;

    /**
     * Text to display for a score or range of scores.
     *
     * The text will be displayed when greater than or equal to the score.
     */
    scoreText?: {
      [score: number]: LanguageMap | null;
    };
  };

  /**
   * The questions of this questionnaire.
   *
   * There must be at least one question.
   */
  questions: [Question, ...Question[]];

  /**
   * The next questionnaire part to display when the learner has completed this
   * questionnaire part.
   *
   * If undefined the learner is not directed to a next questionnaire part.
   *
   * Only valid when the questionnaire part is 'scored'.
   */
  next?: {
    /**
     * A questionnaire to display when the score is greater than or equal to the
     * score key.
     *
     * If null, the learner is not directed to a next questionnaire.
     */
    [score: number]: QuestionnairePart | null;
  };
}

export interface Question {
  /**
   * The id of this question. If undefined then no statement is sent for this question.
   */
  id?: string;

  /**
   * The definition of this question.
   */
  definition: QuestionDefinition;
}

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
   * The feedback for the learner. When reviewed, the learner will always see their own response
   */
  feedback?: {
    /**
     * Show the feedback to the learner immediately after answering the question.
     *
     * Independent of the review setting???
     */
    immediate?: boolean;

    /**
     * Show the correct answer to the learner.
     *
     * Immediate feedback must be true or review must be true???
     */
    showCorrectResponse?: boolean;

    /**
     * The feedback for the learner when the answer is correct.
     *
     * Only displayed when correctResponsePattern is defined.
     *
     * Immediate feedback must be true or review must be true.
     */
    correctText?: LanguageMap;

    /**
     * The feedback for the learner when the answer is incorrect.
     *
     * Only displayed when correctResponsePattern is defined.
     *
     * Immediate feedback must be true or review must be true.
     */
    incorrectText?: LanguageMap;

    /**
     * Show an icon to indicate if the learners answer is correct or incorrect.
     */
    successIcon?: boolean;

    /**
     * Text to display on the question.
     *
     * Immediate feedback must be true or review must be true.
     */
    text?: LanguageMap;
  };

  /**
   * The type of interaction.
   */
  interactionType: InteractionType;

  /**
   * If true, the learner can select multiple options. If false, the learner can only select one option.
   */
  multipleChoice?: boolean;

  /**
   * Score of this QuestionDefinition. Takes precedence over the score of the QuestionInteractionComponents.
   *
   * Only used when the Question has a correctResponsePattern.
   */
  score?: number;

  /**
   * A pattern representing the correct response to the interaction. The structure of this pattern
   * varies depending on the interactionType.
   */
  correctResponsesPattern?: string[];

  /**
   * A pattern representing the exit response to the interaction. The structure of this pattern
   * varies depending on the interactionType. The response should be evaluated before exiting.
   */
  exitResponsesPattern?: string[];

  /**
   * A list of the options available in the interaction for selection or ordering.
   */
  choices?: QuestionInteractionComponent[];

  /**
   * A list of the options on the likert scale.
   */
  scale?: QuestionInteractionComponent[];

  /**
   * Lists of sources to be matched.
   */
  source?: QuestionInteractionComponent[];

  /**
   * Lists of targets to be matched.
   */
  target?: QuestionInteractionComponent[];

  /**
   * A list of the elements making up the performance interaction.
   */
  steps?: QuestionInteractionComponent[];
}

export interface QuestionInteractionComponent {
  /**
   * Identifies the interaction component within the list.
   */
  id: string;

  /**
   * A description of the interaction component.
   */
  description: LanguageMap;

  /**
   * Score of this interaction component. This score is overridden by the score of the QuestionDefinition.
   */
  score?: number;
}
