class CaixaDaLanchonete {
    itens = [
        { nome: "cafe", desc: "Café", valor: 3.00 },
        { nome: "suco", desc: "Suco natural", valor: 6.20 },
        { nome: "sanduiche", desc: "Sanduíche", valor: 6.50 },
        { nome: "salgado", desc: "Salgado", valor: 7.25 },
        { nome: "Combo1", desc: "1 Suco e 1 Sanduíche", valor: 9.50 },
        { nome: "Combo2", desc: "1 Café e 1 Sanduíche", valor: 7.50 },
    ];
    extras = [
        { nome: "chantily", desc: "acompanhante do café", valor: 1.50 },
        { nome: "queijo", desc: "acompanhante do sanduíche", valor: 2.00 },
    ];

    calcularValorDaCompra(formaDePagamento, itensSelecionados) {
        let total = 0;

        for (const item of itensSelecionados) {
            total += item.valor;

            if (item.extras) {
                const extra = this.extras.find(extras => extras.nome === item.extras);
                if (extra) {
                    total += extra.valor;
                }
            }
        }

        if (formaDePagamento === "dinheiro") {
            total *= 0.95; // Desconto
        } else if (formaDePagamento === "credito") {
            total *= 1.03; // Acréscimo
        } else if (formaDePagamento === "debito") {
            total = total;
        } else {
            return "Forma de pagamento Invalida!"
        }

        return total;
    }

    Carrinho(pedido) {
        if (!pedido.item) {
            return "Não há itens no carrinho de compra!";
        }

        const pedidoPrincipal = this.itens.find(item => item.nome === pedido.item);

        if (!pedidoPrincipal) {
            return "Item inválido!";
        }

        const itensSelecionados = [pedidoPrincipal];

        if (pedido.extras) {
            const extra = this.extras.find(extras => extras.nome === pedido.extras);
            if (extra) {
                itensSelecionados[0].extras = extra;
            } else {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        if (!pedido.formaDePagamento) {
            return "Forma de pagamento Inválida!";
        }

        const total = this.calcularValorDaCompra(pedido.formaDePagamento, itensSelecionados);

        return {
            itens: itensSelecionados,
            total: "R$" + total.toFixed(2),
            formaDePagamento: pedido.formaDePagamento
        };
    }
}

const caixaDaLanchonete = new CaixaDaLanchonete();

const caixa = {
    item: "sanduiche",
    extra: "queijo",
    formaDePagamento: "dinheiro",

};

const valorTotal = caixaDaLanchonete.Carrinho(caixa);

console.log(valorTotal);
