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
        {text: "* Todos os benefícios do plano básico."},
        {text: "* Suporte personalizado."},
        {text: "* Desconto de R$ 19,99."}
    ],
    PRO: [
        {text: "* Acesso ao Habitasse por 6 meses."},
        {text: "* Todos os benefícios do Plano Essencial."},
        {text: "* Suporte premium."},
        {text: "* Desconto de R$ 107,99."}
    ],
    PREMIUM: [
        {text: "* Acesso ao Habitasse por 1 ano."},
        {text: "* Todos os benefícios da Plataforma."},
        {text: "* Suporte premium."},
        {text: "* Desconto de R$ 287,98."}
    ]
};

export const PlansEnum = {
    BASICO: {
        id: 1,
        name: "Plano Básico",
        link: "https://buy.stripe.com/28oeXo1AFddR18s3cg",
        value: "R$ 69,99",
        period: "15 dias",
        description: null,
        benefits: benefits.BASICO,
        discount: null
    },
    ESSENCIAL: {
        id: 2,
        name: "Plano Essencial",
        link: "https://buy.stripe.com/5kA16y9377TxdVe005",
        value: "R$ 119,99",
        period: "1 mês",
        description: null,
        benefits: benefits.ESSENCIAL,
        discount: true
    },
    PRO: {
        id: 3,
        name: "Plano Pro",
        link: "https://buy.stripe.com/eVacPg5QV0r5cRa8wE",
        value: "R$ 611,95",
        period: "6 meses",
        description: null,
        benefits: benefits.PRO,
        discount: null
    },
    PREMIUM: {
        id: 4,
        name: "Plano Premium",
        link: "https://buy.stripe.com/3cscPg1AFgq32cw3cl",
        value: "R$ 1.151,90",
        period: "1 ano",
        description: null,
        benefits: benefits.PREMIUM,
        discount: null
    }
};
