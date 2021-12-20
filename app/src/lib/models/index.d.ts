import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type OpenAnswerDraftMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OpenAnswerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OpenFeedbackDraftMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OpenFeedbackMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OpenQuestionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChallengePoolMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OpenQuestionDraftMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class OpenAnswerDraft {
  readonly id: string;
  readonly answerText?: string;
  readonly openquestionID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<OpenAnswerDraft, OpenAnswerDraftMetaData>);
  static copyOf(source: OpenAnswerDraft, mutator: (draft: MutableModel<OpenAnswerDraft, OpenAnswerDraftMetaData>) => MutableModel<OpenAnswerDraft, OpenAnswerDraftMetaData> | void): OpenAnswerDraft;
}

export declare class OpenAnswer {
  readonly id: string;
  readonly answerText?: string;
  readonly owner?: string;
  readonly openquestionID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<OpenAnswer, OpenAnswerMetaData>);
  static copyOf(source: OpenAnswer, mutator: (draft: MutableModel<OpenAnswer, OpenAnswerMetaData>) => MutableModel<OpenAnswer, OpenAnswerMetaData> | void): OpenAnswer;
}

export declare class OpenFeedbackDraft {
  readonly id: string;
  readonly feedbackText?: string;
  readonly openanswerID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<OpenFeedbackDraft, OpenFeedbackDraftMetaData>);
  static copyOf(source: OpenFeedbackDraft, mutator: (draft: MutableModel<OpenFeedbackDraft, OpenFeedbackDraftMetaData>) => MutableModel<OpenFeedbackDraft, OpenFeedbackDraftMetaData> | void): OpenFeedbackDraft;
}

export declare class OpenFeedback {
  readonly id: string;
  readonly feedbackText?: string;
  readonly owner?: string;
  readonly openanswerID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<OpenFeedback, OpenFeedbackMetaData>);
  static copyOf(source: OpenFeedback, mutator: (draft: MutableModel<OpenFeedback, OpenFeedbackMetaData>) => MutableModel<OpenFeedback, OpenFeedbackMetaData> | void): OpenFeedback;
}

export declare class OpenQuestion {
  readonly id: string;
  readonly questionText?: string;
  readonly challengepoolID?: string;
  readonly owner?: string;
  readonly OpenAnswers?: (OpenAnswer | null)[];
  readonly OpenAnswerDrafts?: (OpenAnswerDraft | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<OpenQuestion, OpenQuestionMetaData>);
  static copyOf(source: OpenQuestion, mutator: (draft: MutableModel<OpenQuestion, OpenQuestionMetaData>) => MutableModel<OpenQuestion, OpenQuestionMetaData> | void): OpenQuestion;
}

export declare class ChallengePool {
  readonly id: string;
  readonly description?: string;
  readonly owner?: string;
  readonly OpenQuestions?: (OpenQuestion | null)[];
  readonly OpenQuestionDrafts?: (OpenQuestionDraft | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChallengePool, ChallengePoolMetaData>);
  static copyOf(source: ChallengePool, mutator: (draft: MutableModel<ChallengePool, ChallengePoolMetaData>) => MutableModel<ChallengePool, ChallengePoolMetaData> | void): ChallengePool;
}

export declare class OpenQuestionDraft {
  readonly id: string;
  readonly questionText?: string;
  readonly answerText?: string;
  readonly challengepoolID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<OpenQuestionDraft, OpenQuestionDraftMetaData>);
  static copyOf(source: OpenQuestionDraft, mutator: (draft: MutableModel<OpenQuestionDraft, OpenQuestionDraftMetaData>) => MutableModel<OpenQuestionDraft, OpenQuestionDraftMetaData> | void): OpenQuestionDraft;
}