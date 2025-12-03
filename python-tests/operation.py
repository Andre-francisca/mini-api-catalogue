def addition(a, b):
    """Retourne la somme de a et b."""
    return a + b

def maximum(a, b):
    """Retourne le maximum entre a et b."""
    return a if a >= b else b

def format_nom(prenom, nom):
    """
    Formatte un prénom et un nom : 'Prenom NOM'.
    Lève ValueError si prenom ou nom est None.
    """
    if prenom is None or nom is None:
        raise ValueError('prenom et nom requis')
    return f"{prenom.capitalize()} {nom.upper()}"
