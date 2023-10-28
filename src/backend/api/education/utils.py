def count_rating(rating: float, correct: int, total: int) -> float:
    rating += (correct - (total - correct) * 2) * 0.01
    if rating > 5:
        return 5.0
    return rating
