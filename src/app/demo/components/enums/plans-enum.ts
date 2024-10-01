export const benefits = {
    ESSENCIAL: [
        {text: "* Acesso ao Habitasse por 1 mês."},
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
    ESSENCIAL: {
        id: 1,
        name: "Plano Essencial",
        link: "https://buy.stripe.com/5kA16y9377TxdVe005",
        value: "R$ 119,99",
        period: "1 mês",
        description: null,
        benefits: benefits.ESSENCIAL,
        discount: true
    },
    PRO: {
        id: 2,
        name: "Plano Pro",
        link: "https://buy.stripe.com/eVacPg5QV0r5cRa8wE",
        value: "R$ 611,95",
        period: "6 meses",
        description: null,
        benefits: benefits.PRO,
        discount: null
    },
    PREMIUM: {
        id: 3,
        name: "Plano Premium",
        link: "https://buy.stripe.com/3cscPg1AFgq32cw3cl",
        value: "R$ 1.151,90",
        period: "1 ano",
        description: null,
        benefits: benefits.PREMIUM,
        discount: null
    }
};
