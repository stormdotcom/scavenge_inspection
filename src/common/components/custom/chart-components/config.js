const commonConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "bottom",
            display: true,
            labels: {
                font: {
                    size: 14
                }
            }
        },
        title: {
            display: true,
            text: ""
        },
        tooltip: {
            bodyFont: {
                size: 16
            },
            titleFont: {
                size: 18
            }
        },
        datalabels: {
            display: true,
            anchor: "end",
            align: "end",
            offset: 1,
            font: {
                weight: "bold"
            }
        }
    }
};

function getRandomColor() {
    let letters = "0123456789ABCDEF".split("");
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function barColors(a) {
    let pool = [];
    for (let i = 0; i < a; i++) {
        pool.push(getRandomColor());
    }
    return pool;
}

export const barConfig = {
    ...commonConfig,
    elements: {
        bar: {
            borderWidth: 2,
            backgroundColor: barColors(6)
        }
    },
    datasets: {
        bar: {
            maxBarThickness: 50
        }
    }

};

export const lineConfig = {
    ...commonConfig,
    indexAxis: "x",
    datasets: {
        line: {
            fill: true,
            borderColor: "#86938E"
        }
    }
};

export const pieConfig = {
    ...commonConfig
};

export const doughnutConfig = {
    ...commonConfig,
    datasets: {
        doughnut: {
            backgroundColor: ["#D5573B", "#F0A202", "#202C59", "#826AED", "#FF6B6C", "#A5D8FF", "#254441", "#B9D8C2"]
        }
    }
};

export function getGradient(ctx, fillColor) {
    let gradient = "";
    gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, fillColor);
    gradient.addColorStop(1, "#FFF");
    return gradient;
}
