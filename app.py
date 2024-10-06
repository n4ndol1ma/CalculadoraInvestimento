from flask import Flask, render_template, request
from dotenv import load_dotenv
import os

load_dotenv()  # Carregar variáveis do arquivo .env

app = Flask(__name__)

# Função para calcular os rendimentos
def calcular_rendimento(investimento_inicial, taxa_lucro, prazo_dias, objetivo_retorno, taxa_cambio, aportes_mensais=0):
    taxa_lucro = taxa_lucro / 100
    valor_atual = investimento_inicial
    reinvestimentos = 0
    total_dias = 0

    while valor_atual < objetivo_retorno:
        valor_atual *= (1 + taxa_lucro)
        valor_atual += aportes_mensais  # Adiciona o aporte mensal
        reinvestimentos += 1
        total_dias += prazo_dias

    rendimento_total_reais = valor_atual * (taxa_cambio if taxa_cambio else 1)

    total_meses = total_dias // 30
    dias_restantes = total_dias % 30

    return (
        valor_atual,  # Retorna o valor atual após reinvestimentos
        rendimento_total_reais, 
        reinvestimentos, 
        total_dias, 
        total_meses, 
        dias_restantes,
    )

# Rota principal
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        try:
            investimento_inicial = float(request.form["investimento_inicial"])
            taxa_lucro = float(request.form["taxa_lucro"])
            prazo_tipo = request.form["prazo_tipo"]
            objetivo_retorno = float(request.form["objetivo_retorno"])
            taxa_cambio = float(request.form["taxa_cambio"]) if request.form.get("taxa_cambio") else 1  # Default para 1 se não fornecido
            aportes_mensais = float(request.form.get("aportes_mensais", 0))  # Captura aportes mensais, padrão 0

            # Validação de entradas
            if investimento_inicial <= 0 or taxa_lucro < 0 or objetivo_retorno <= 0 or taxa_cambio <= 0:
                raise ValueError("Os valores de investimento, taxa de lucro, objetivo de retorno e taxa de câmbio devem ser positivos.")

            # Definindo prazo em dias
            prazo_dias = 15 if prazo_tipo == "quinzenal" else 30 if prazo_tipo == "mensal" else None
            if prazo_dias is None:
                raise ValueError("Prazo inválido.")

            # Cálculo dos rendimentos
            rendimento_total, rendimento_total_reais, reinvestimentos, total_dias, total_meses, dias_restantes = calcular_rendimento(
                investimento_inicial, taxa_lucro, prazo_dias, objetivo_retorno, taxa_cambio, aportes_mensais
            )

            return render_template("index.html", resultado=True,
                                   investimento_inicial=investimento_inicial,
                                   rendimento_total=rendimento_total,
                                   rendimento_total_reais=rendimento_total_reais,
                                   reinvestimentos=reinvestimentos,
                                   prazo_tipo=prazo_tipo.capitalize(),
                                   objetivo_retorno=objetivo_retorno,
                                   taxa_cambio=taxa_cambio,
                                   total_dias=total_dias,
                                   total_meses=total_meses,
                                   dias_restantes=dias_restantes,
                                   doacao_link=os.getenv("DOACAO_LINK"),
                                   aviso_variacao="Os valores podem variar devido à variação das taxas dos traders.")

        except ValueError as ve:
            return render_template("index.html", error=f"Entrada inválida: {str(ve)}", taxa_cambio=None)
        except Exception as e:
            return render_template("index.html", error="Ocorreu um erro inesperado. Tente novamente mais tarde.", taxa_cambio=None)

    return render_template("index.html", taxa_cambio=None, doacao_link=os.getenv("DOACAO_LINK"))

# Nota: Removida a linha abaixo para produção
# app.run()
