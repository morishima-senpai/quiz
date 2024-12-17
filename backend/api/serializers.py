from rest_framework import serializers
from .models import Question, QuizSession, QuestionOption


class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = ['id', 'text']


class QuestionSerializer(serializers.ModelSerializer):
    options = QuestionOptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'difficulty', 'options']

class QuizSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizSession
        fields = [
            'id', 
            'user', 
            'started_at', 
            'total_questions', 
            'correct_answers', 
            'score_percentage'
        ]
        read_only_fields = ['user']


    def create(self, validated_data):

        # automatically set the user to the current user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class StatisticsSerializer(serializers.ModelSerializer):
    score = serializers.FloatField(read_only=True)
    class Meta:
        model = QuizSession
        fields = ["started_at", "total_questions", "correct_answers", "score"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['started_at'] = instance.started_at.strftime("%d %b %Y %I:%M %p")
        representation['score'] = round(instance.score, 1) if instance.score else None
        return representation


class AttemptSerializer(serializers.Serializer):
    question_id = serializers.UUIDField()
    option_id = serializers.IntegerField()

class SkipAndFinishSerializer(serializers.Serializer):
    skip = serializers.BooleanField()