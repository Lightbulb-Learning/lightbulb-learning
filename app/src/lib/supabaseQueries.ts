import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { definitions } from '$lib/models/supabase';
import { CamelCasedPropertiesDeep, keysToCamelCase } from 'object-key-convert';
import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Session } from '@supabase/auth-helpers-svelte';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl.toString(), supabaseAnonKey.toString());

export async function fetchCourses(session: Session): Promise<CourseType[]> {
	const { data, error } = await supabase.rpc('fetch_my_courses', {
		user_id_input: session.user.id
	});

	printIf(error);
	return keysToCamelCase(data);
}

export async function saveCourse(description: string, userId: string): Promise<CourseType> {
	const { data, error } = await supabase
		.from<CourseTypeDB>(coursesTable)
		.insert({ description, owner: userId })
		.single();
	printIf(error);
	const course: CourseType = keysToCamelCase(data);
	await saveCourseUser(course.id, userId);
	return course;
}

// only for the owner of a course.
// Regular member must use the join course function.
async function saveCourseUser(courseId: string, userId: string) {
	const { data, error } = await supabase
		.from<CourseUserTypeDB>(courseUserTable)
		.insert({ course: courseId, user_id: userId })
		.single();
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchCourse(id: string, session: Session): Promise<CourseType> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<CourseTypeDB>(coursesTable)
		.select()
		.eq('id', id)
		.maybeSingle();
	printIf(error);
	return keysToCamelCase(data);
}

export async function deleteCourse(id: string) {
	const { error } = await supabase.from<CourseTypeDB>(coursesTable).delete().eq('id', id);
	printIf(error);
}

export async function fetchQuestions(courseId: string, session: Session): Promise<QuestionType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<QuestionTypeDB>(questionsTable)
		.select()
		.eq('course', courseId);
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchQuestion(id: string, session: Session): Promise<QuestionType> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<QuestionTypeDB>(questionsTable)
		.select()
		.eq('id', id)
		.maybeSingle();
	printIf(error);
	return keysToCamelCase(data);
}

export async function saveQuestion(
	questionText: string,
	courseId: string, userId: string
): Promise<QuestionType> {
	const { data, error } = await supabase
		.from<QuestionTypeDB>(questionsTable)
		.insert({
			question_text: questionText,
			course: courseId,
			owner: userId
		})
		.single();
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchAnswer(id: string, session: Session): Promise<AnswerType> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<AnswerTypeDB>(answersTable)
		.select()
		.eq('id', id)
		.maybeSingle();
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchLatestAnswer(questionId: string, session: Session): Promise<AnswerType> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<AnswerTypeDB>(answersTable)
		.select()
		.eq('question', questionId)
		.eq('owner', session.user.id)
		.order('version', { ascending: false })
		.limit(1);
	printIf(error);
	return keysToCamelCase(data[0]);
}

export async function fetchAnswersOfOthers(
	questionId: string,
	session: Session
): Promise<AnswerType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<AnswerTypeDB>(answersTable)
		.select()
		.eq('question', questionId)
		.neq('owner', session.user.id);
	printIf(error);
	return keysToCamelCase(data);
}

export async function saveAnswer(
	answerText: string,
	questionId: string,
	userId: string,
	version = 1
): Promise<AnswerType> {
	const { data, error } = await supabase
		.from<AnswerTypeDB>(answersTable)
		.insert({
			answer_text: answerText,
			question: questionId,
			owner: userId,
			version
		})
		.single();
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchMyFeedback(answerId: string, session: Session): Promise<FeedbackType> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<FeedbackTypeDB>(feedbackTable)
		.select()
		.eq('owner', session.user.id)
		.eq('answer', answerId)
		.maybeSingle();
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchFeedbackOfOthers(answerId: string, session: Session): Promise<FeedbackType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<FeedbackTypeDB>(feedbackTable)
		.select()
		.eq('answer', answerId)
		.neq('owner', session.user.id);
	printIf(error);
	return keysToCamelCase(data);
}

export async function saveFeedback(
	feedbackText: string,
	answerId: string,
	userId: string
): Promise<FeedbackType> {
	const { data, error } = await supabase
		.from<FeedbackTypeDB>(feedbackTable)
		.insert({
			feedback_text: feedbackText,
			answer: answerId,
			owner: userId
		})
		.single();
	printIf(error);
	return keysToCamelCase(data);
}

export async function joinCourse(inviteCode: string, session: Session): Promise<string> {
	if (!inviteCode || inviteCode.length != 10) {
		console.error('invalid invite code: ' + inviteCode);
	}
	const { data, error } = await supabase.rpc('join_course', {
		invite_code_input: inviteCode,
		user_id_input: session.user.id
	});
	printIf(error);
	return data.toString();
}

export async function saveInviteCode(courseId: string, code: string, session: Session): Promise<InviteCodeType> {
	const validUntil = new Date();
	validUntil.setFullYear(2100); // do not expire links for now

	const { data, error } = await supabase
		.from<InviteCodeTypeDB>(inviteCodesTable)
		.insert({
			course: courseId,
			code,
			valid_until: validUntil.toISOString(),
			owner: session.user.id
		})
		.single();
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchMembers(courseId: string, session: Session): Promise<MemberType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<MemberTypeDB>(membersView)
		.select()
		.eq('course', courseId);
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchMember(courseUserId: string, session: Session): Promise<MemberType> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<MemberTypeDB>(membersView)
		.select()
		.eq('id', courseUserId)
		.single();
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchQuestionPerformances(courseUserId: string, session: Session): Promise<QuestionPerformanceType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<QuestionPerformanceTypeDB>(questionPerformancesView)
		.select()
		.eq('id', courseUserId);
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchAnswerPerformances(courseUserId: string, session: Session): Promise<AnswerPerformanceType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<AnswerPerformanceTypeDB>(answerPerformancesView)
		.select()
		.eq('id', courseUserId);
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchFeedbackPerformances(courseUserId: string, session: Session): Promise<feedbackPerformanceType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<feedbackPerformanceTypeDB>(feedbackPerformancesView)
		.select()
		.eq('id', courseUserId);
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchTopics(courseId: string, session: Session): Promise<TopicType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<TopicTypeDB>(topicsTable)
		.select()
		.eq('course', courseId);
	printIf(error);
	return keysToCamelCase(data);
}

export async function saveTopic(courseId: string, name: string): Promise<TopicType> {
	const { data, error } = await supabase
		.from<TopicTypeDB>(topicsTable)
		.insert({
			course: courseId,
			name
		})
		.single();
	printIf(error);
	return keysToCamelCase(data);
}

export async function saveQuestionTopics(questionId: string, topics: string[]): Promise<QuestionTopicType[]> {
	let questionTopics = []
	topics.forEach((topic) => {
		questionTopics.push({ question: questionId, topic })
	})
	const { data, error } = await supabase
		.from<QuestionTopicTypeDB>(questionTopicTable)
		.insert(questionTopics);
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchQuestionTopics(questionIds: string[], session: Session): Promise<QuestionTopicType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<QuestionTopicTypeDB>(questionTopicTable)
		.select()
		.in('question', questionIds);
	printIf(error);
	return keysToCamelCase(data);
}

export async function saveQuestionLike(questionId: string, session: Session): Promise<QuestionLikeType> {
	const { data, error } = await supabase
		.from<QuestionLikeTypeDB>(questionLikesTable)
		.insert({ question: questionId, owner: session.user.id })
		.single();
	printIf(error);
	return keysToCamelCase(data);
}
export async function saveAnswerLike(answerId: string, session: Session): Promise<AnswerLikeType> {
	const { data, error } = await supabase
		.from<AnswerLikeTypeDB>(answerLikesTable)
		.insert({ answer: answerId, owner: session.user.id })
		.single();
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchMyQuestionLikes(questionIds: string[], session: Session): Promise<QuestionLikeType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<QuestionLikeTypeDB>(questionLikesTable)
		.select()
		.eq('owner', session.user.id)
		.in('question', questionIds);
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchMyAnswerLikes(answerIds: string[], session: Session): Promise<AnswerLikeType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<AnswerLikeTypeDB>(answerLikesTable)
		.select()
		.eq('owner', session.user.id)
		.in('answer', answerIds);
	printIf(error);
	return keysToCamelCase(data);
}

export async function deleteQuestionLike(questionId: string) {
	// TODO: doesn't this delete too much?!?! Or is this regulated by RLS?
	const { error } = await supabase
		.from<QuestionLikeTypeDB>(questionLikesTable)
		.delete()
		.eq('question', questionId);
	printIf(error);
}

export async function deleteAnswerLike(answerId: string) {
	// TODO: doesn't this delete too much?!?! Or is this regulated by RLS?
	const { error } = await supabase
		.from<AnswerLikeTypeDB>(answerLikesTable)
		.delete()
		.eq('answer', answerId);
	printIf(error);
}

export async function fetchProgresses(courseUserId: string, session: Session): Promise<ProgressType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<ProgressTypeDB>(progressesTable)
		.select()
		.eq('course_user', courseUserId)
	printIf(error);
	return keysToCamelCase(data);
}

export async function saveProgress(courseUserId: string, percentage: number): Promise<ProgressType> {
	const { data, error } = await supabase
		.from<ProgressTypeDB>(progressesTable)
		.insert({ course_user: courseUserId, percentage })
		.single();
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchAnswers(questionIds: string[], session: Session): Promise<AnswerType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<AnswerTypeDB>(answersTable)
		.select()
		.in('question', questionIds);
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchQuestionLikes(questionIds: string[], session: Session): Promise<QuestionLikeType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<QuestionLikeTypeDB>(questionLikesTable)
		.select()
		.in('question', questionIds);
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchAnswerLikes(answerIds: string[], session: Session): Promise<AnswerLikeType[]> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<AnswerLikeTypeDB>(answerLikesTable)
		.select()
		.in('answer', answerIds);
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchCourseUser(courseId: string, session: Session): Promise<ProgressType> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from(courseUserTable)
		.select()
		.eq("course", courseId)
		.eq("user_id", session.user.id)
		.single()
	printIf(error);
	return keysToCamelCase(data);
}

export async function fetchMyLatestProgress(courseUserId: string, session: Session): Promise<ProgressType> {
	const { data, error } = await supabaseServerClient(session.accessToken)
		.from<ProgressTypeDB>(progressesTable)
		.select()
		.eq('course_user', courseUserId)
		.order("created_at", { ascending: false });
	printIf(error);
	return keysToCamelCase(data[0]);
}

function printIf(error) {
	if (error) console.error(error);
}

export const coursesTable = 'courses';
export const questionsTable = 'questions';
export const answersTable = 'answers';
export const feedbackTable = 'feedback';
export const profilesTable = 'profiles';
export const universitiesTable = 'universities';
export const courseUserTable = 'course_user';
export const inviteCodesTable = 'invite_codes';
export const membersView = 'members';
export const questionPerformancesView = 'question_performances';
export const answerPerformancesView = 'answer_performances';
export const feedbackPerformancesView = 'feedback_performances';
export const topicsTable = 'topics';
export const questionTopicTable = 'question_topic';
export const questionLikesTable = 'question_likes';
export const answerLikesTable = 'answer_likes';
export const progressesTable = 'progresses';

export type CourseType = CamelCasedPropertiesDeep<definitions['courses']>;
export type QuestionType = CamelCasedPropertiesDeep<definitions['questions']>;
export type AnswerType = CamelCasedPropertiesDeep<definitions['answers']>;
export type FeedbackType = CamelCasedPropertiesDeep<definitions['feedback']>;
export type ProfileType = CamelCasedPropertiesDeep<definitions['profiles']>;
export type UniversityType = CamelCasedPropertiesDeep<definitions['universities']>;
export type CourseUserType = CamelCasedPropertiesDeep<definitions['course_user']>;
export type InviteCodeType = CamelCasedPropertiesDeep<definitions['invite_codes']>;
export type MemberType = CamelCasedPropertiesDeep<definitions['members']>;
export type QuestionPerformanceType = CamelCasedPropertiesDeep<
	definitions['question_performances']
>;
export type AnswerPerformanceType = CamelCasedPropertiesDeep<definitions['answer_performances']>;
export type feedbackPerformanceType = CamelCasedPropertiesDeep<
	definitions['feedback_performances']
>;
export type TopicType = CamelCasedPropertiesDeep<definitions['topics']>;
export type QuestionTopicType = CamelCasedPropertiesDeep<definitions['question_topic']>;
export type QuestionLikeType = CamelCasedPropertiesDeep<definitions['question_likes']>;
export type AnswerLikeType = CamelCasedPropertiesDeep<definitions['answer_likes']>;
export type ProgressType = CamelCasedPropertiesDeep<definitions['progresses']>;

export type CourseTypeDB = definitions['courses'];
export type QuestionTypeDB = definitions['questions'];
export type AnswerTypeDB = definitions['answers'];
export type FeedbackTypeDB = definitions['feedback'];
export type ProfileTypeDB = definitions['profiles'];
export type UniversityTypeDB = definitions['universities'];
export type CourseUserTypeDB = definitions['course_user'];
export type InviteCodeTypeDB = definitions['invite_codes'];
export type MemberTypeDB = definitions['members'];
export type QuestionPerformanceTypeDB = definitions['question_performances'];
export type AnswerPerformanceTypeDB = definitions['answer_performances'];
export type feedbackPerformanceTypeDB = definitions['feedback_performances'];
export type TopicTypeDB = definitions['topics'];
export type QuestionTopicTypeDB = definitions['question_topic'];
export type QuestionLikeTypeDB = definitions['question_likes'];
export type AnswerLikeTypeDB = definitions['answer_likes'];
export type ProgressTypeDB = definitions['progresses'];