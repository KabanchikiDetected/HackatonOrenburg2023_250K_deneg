import random
import database


def generate_questions(n=5):
    questions = []
    for i in range(1, n + 1):
        question = {
            "question": f"Вопрос{i}",
            "variants": ["a", "b", "c", "d", "e"]
        }
        is_multianswer = random.random() > 0.5
        question["is_multianswer"] = is_multianswer

        k = random.randint(2, 4) if is_multianswer else 1
        question["answers"] = random.sample(question["variants"], k=k)
        questions.append(question)
    return questions


def generate_tests(n=10):
    tests = []
    for i in range(1, n + 1):
        test = {
            # "_id": database.ObjectId(str(i)),
            "title": f"Тест{i}",
            "guide_id": None,
            "max_result": 5,
            "total": 5,
            "questions": generate_questions(5)
        }
        tests.append(test)
    return tests


def main():
    table = database.db['tests']
    table.insert_many(generate_tests())
    # for test in generate_tests():


main()