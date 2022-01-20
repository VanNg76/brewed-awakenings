import { getEmployees, getOrders } from "./database.js"

const employees = getEmployees()
const orders = getOrders()

export const Employees = () => {
    let html = "<ul>"

    for (const employee of employees) {
        html += `<li id="employee--${employee.id}">${employee.name}</li>`
    }

    html += "</ul>"

    return html
}

// Count how many product(IDs) per employee. Define a function (employee) return [productIDs]
export const countProductByEmployee = (employee) => {
    let count = []
    for (const order of orders) {
        if (employee.id === order.employeeId) {
            count++
        }
    }

    return count
}


document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("employee")) {
            const [,clickedEmployee] = itemClicked.id.split("--")

            for (const employee of employees) {
                if (employee.id === parseInt(clickedEmployee)) {
                    const count = countProductByEmployee(employee)
                    if (count === 0) {
                        window.alert(`${employee.name} sold Nothing`)
                    } else {
                        window.alert(`${employee.name} sold ${count} products`)
                    }
                }
            }
        }
    }
)
