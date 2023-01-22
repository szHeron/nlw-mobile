
export function generateProgressPorcentage(amount: number, completed: number){
    return amount > 0 ? Math.round((completed/amount)*100) : 0
}