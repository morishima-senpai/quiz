from rest_framework import serializers
from .models import Question, QuizSession, QuestionOption


class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = ['id', 'text']


class QuestionSerializer(serializers.ModelSerializer):
    options = QuestionOptionSerializer(source="question.options", many=True)

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