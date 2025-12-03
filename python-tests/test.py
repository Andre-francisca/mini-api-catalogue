from operation import addition, maximum, format_nom

def test_addition():
    assert addition(1, 2) == 3
    assert addition(-1, 1) == 0
    assert addition(0, 0) == 0

def test_maximum():
    assert maximum(1, 2) == 2
    assert maximum(5, 5) == 5
    assert maximum(-3, -1) == -1

def test_format_nom():
    assert format_nom('jean', 'dupont') == 'Jean DUPONT'
    # test d'erreur : on s'attend à une ValueError si l'un des paramètres est None
    try:
        format_nom(None, 'dupont')
        raise AssertionError("format_nom(None, 'dupont') devrait lever ValueError")
    except ValueError:
        pass

if __name__ == '__main__':
    test_addition()
    test_maximum()
    test_format_nom()
    print('Tous les tests passent')
