package handler

import java.util.HashMap;
import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.events.{
  APIGatewayV2HTTPEvent,
  APIGatewayV2HTTPResponse
}
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import scala.language.implicitConversions
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.http.SdkHttpClient;

import software.amazon.awssdk.services.sns.model.{MessageAttributeValue, PublishRequest, PublishResponse}
import scala.jdk.CollectionConverters.MapHasAsJava

import little.json.*
import little.json.Implicits.{*, given}

class Handler {
  def handle(
      apiGatewayEvent: APIGatewayV2HTTPEvent,
      context: Context
  ): APIGatewayV2HTTPResponse = {
    if (apiGatewayEvent != null && apiGatewayEvent.getBody() != null) {
      val eventBody = apiGatewayEvent.getBody()
      val openAnswer = Json.parse(eventBody).as[OpenAnswer]
      val openAnswerCommittedEvent =
        openAnswer.toOpenAnswerCommittedEvent()
      val publishResult = publish(openAnswerCommittedEvent)

      return APIGatewayV2HTTPResponse
        .builder()
        .withStatusCode(200)
        .withBody("{success: true}")
        .build()
    } else {
      /* For OPTIONS call*/
      println(
        "Handling request with apiGatewayEvent == null or apiGatewayEvent.body == null"
      )
      return APIGatewayV2HTTPResponse
        .builder()
        .withStatusCode(200)
        .withBody(s"${apiGatewayEvent.getBody()}")
        .build()
    }
  }

  def publish(
      openAnswerCommittedEvent: OpenAnswerCommittedEvent
  ): PublishResponse = {
    val httpClient = ApacheHttpClient.builder().build();

    val snsClient = SnsClient
      .builder()
      .httpClient(httpClient)
      .region(Region.EU_CENTRAL_1)
      .build()

    val MessageAttributes =
      Map(
        "TYPE" -> MessageAttributeValue.builder().stringValue("OPEN_ANSWER_CREATED").dataType("String").build()
    )

    val request: PublishRequest = PublishRequest
      .builder()
      .message(s"${Json.toJson(openAnswerCommittedEvent)}")
      .messageGroupId(openAnswerCommittedEvent.id)
      .messageAttributes(MessageAttributes.asJava)
      .topicArn(
        "arn:aws:sns:eu-central-1:532688539985:open-question-topic.fifo"
      )
      .build()

    val result = snsClient.publish(request)
    println(s"publish result = ${snsClient.publish(request)}");
    return result
  }
}
