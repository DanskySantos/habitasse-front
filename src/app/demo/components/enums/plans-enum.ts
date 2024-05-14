export const benefits = {
    BASICO: [
        {text: "* Acesso ao Habitasse por 15 dias."},
        {text: "* Ofertas a vontade."},
        {text: "* Filtro de Pesquisa rápida."},
        {text: "* Contato direto com o cliente."},
        {text: "* Integração com Whatsapp."}
    ],
    ESSENCIAL: [
        {text: "* Acesso ao Habitasse por 1 mês."},
        {text: "* Ofertas a vontade."},
        {text: "* Filtro de Pesquisa rápida."},
        {text: "* Contato direto com o cliente."},
        {text: "* Integração com Whatsapp."}
    ],
    PRO: [
        {text: "* Acesso ao Habitasse por 6 meses."},
        {text: "* Ofertas a vontade."},
        {text: "* Filtro de Pesquisa rápida."},
        {text: "* Contato direto com o cliente."},
        {text: "* Integração com Whatsapp."},
        {text: "* Acesso a comunidade Habitasse."},
        {text: "* Suporte Vip via Whatsapp."},
        {text: "* Desconto de R$ 143,99."}
    ],
    PREMIUM: [
        {text: "* Acesso ao Habitasse por 6 meses."},
        {text: "* Ofertas a vontade."},
        {text: "* Filtro de Pesquisa rápida."},
        {text: "* Contato direto com o cliente."},
        {text: "* Integração com Whatsapp."},
        {text: "* Acesso a comunidade Habitasse."},
        {text: "* Suporte Vip via Whatsapp."},
        {text: "* Desconto de R$ 288,99."}
    ]
};

export const PlansEnum = {
    BASICO: {
        name: "Plano Básico",
        link: "https://buy.stripe.com/28oeXo1AFddR18s3cg",
        value: "R$ 69,99",
        period: "15 dias",
        description: "Ideal para proprietários de múltiplos imóveis que ocasionalmente precisam aluga-los.",
        benefits: benefits.BASICO,
        discount: null
    },
    ESSENCIAL: {
        name: "Plano Essencial",
        link: "https://buy.stripe.com/5kA16y9377TxdVe005",
        value: "R$ 119,99",
        period: "1 mes",
        description: "Ideal para aqueles que trabalham diretamente com comercialização de imóveis.",
        benefits: benefits.ESSENCIAL,
        discount: null
    },
    PRO: {
        name: "Plano Pro",
        link: "https://buy.stripe.com/7sIaH8frva1FaJ28wC",
        value: "R$ 575,99",
        period: "6 meses",
        description: "Ideal para aqueles que trabalham diretamente com comercialização de imóveis de médio e alto padrão.",
        benefits: benefits.PRO,
        discount: "Desconto de 20%"
    },
    PREMIUM: {
        name: "Plano Premium",
        link: "https://buy.stripe.com/cN202u1AFgq3eZi5kr",
        value: "R$ 1.150,99",
        period: "1 ano",
        description: "Ideal para aqueles que trabalham diretamente com comercialização de imóveis de médio e alto padrão.",
        benefits: benefits.PREMIUM,
        discount: "Desconto de 20%"
    }
};
