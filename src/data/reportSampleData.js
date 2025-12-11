// Centralized sample data for all reports
// This file contains dynamic data generation for different frequencies and months

// Helper function to get month info
const getMonthInfo = (monthStr) => {
    const date = new Date(monthStr + '-01');
    return {
        name: date.toLocaleDateString('en-US', { month: 'short' }),
        fullName: date.toLocaleDateString('en-US', { month: 'long' }),
        year: date.getFullYear(),
        daysInMonth: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    };
};

// Generate random variance for realistic data
const variance = (base, percent = 0.1) => {
    return base * (1 + (Math.random() - 0.5) * percent);
};

// Calculate KPIs from task data
const calculateKPIs = (tasks) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.percent === 100).length;
    const avgHealth = Math.round(tasks.reduce((sum, t) => sum + t.health, 0) / totalTasks);
    const avgSPI = Number((tasks.reduce((sum, t) => sum + t.spi, 0) / totalTasks).toFixed(2));
    const avgCPI = Number((tasks.reduce((sum, t) => sum + t.cpi, 0) / totalTasks).toFixed(2));
    const totalActual = tasks.reduce((sum, t) => sum + t.actual, 0);
    const totalBaseline = tasks.reduce((sum, t) => sum + t.baseline, 0);

    return {
        productivityScore: Math.round(variance(78, 0.1)),
        hoursEfficiency: avgCPI,
        avgHealth,
        onTimeDelivery: Math.round(variance(completedTasks / totalTasks * 100, 0.05)),
        avgSPI,
        avgCPI,
        totalActual,
        totalBaseline,
        scheduleVariance: Math.round((totalActual - totalBaseline) * avgSPI),
        costVariance: Math.round((totalBaseline - totalActual) * avgCPI)
    };
};

// ============================================
// EMPLOYEE REPORT DATA
// ============================================

// Dynamic task data based on selected month
export const getEmployeeTaskData = (frequency, selectedMonth) => {
    const monthInfo = getMonthInfo(selectedMonth);
    const baseMultiplier = frequency === 'daily' ? 1 : frequency === 'weekly' ? 4 : 30;

    // Base tasks that always appear
    const baseTasks = [
        {
            id: 'TASK-001',
            name: 'DB Migration',
            percent: Math.round(variance(75, 0.2)),
            actual: Math.round(variance(32 * baseMultiplier, 0.15)),
            baseline: Math.round(40 * baseMultiplier),
            var: Math.round(variance(-8 * baseMultiplier, 0.3)),
            spi: Number(variance(0.95, 0.1).toFixed(2)),
            cpi: Number(variance(1.12, 0.1).toFixed(2)),
            health: Math.round(variance(85, 0.15)),
            status: 'Normal'
        },
        {
            id: 'TASK-002',
            name: 'API Dev',
            percent: Math.round(variance(60, 0.2)),
            actual: Math.round(variance(28 * baseMultiplier, 0.15)),
            baseline: Math.round(25 * baseMultiplier),
            var: Math.round(variance(3 * baseMultiplier, 0.3)),
            spi: Number(variance(0.88, 0.1).toFixed(2)),
            cpi: Number(variance(0.94, 0.1).toFixed(2)),
            health: Math.round(variance(68, 0.15)),
            status: 'Warning'
        },
        {
            id: 'TASK-003',
            name: 'Code Review',
            percent: Math.round(variance(100, 0.1)),
            actual: Math.round(variance(12 * baseMultiplier, 0.15)),
            baseline: Math.round(15 * baseMultiplier),
            var: Math.round(variance(-3 * baseMultiplier, 0.3)),
            spi: Number(variance(1.00, 0.05).toFixed(2)),
            cpi: Number(variance(1.18, 0.1).toFixed(2)),
            health: Math.round(variance(92, 0.1)),
            status: 'Normal'
        },
    ];

    // Additional tasks for weekly view
    const weeklyTasks = [
        {
            id: 'TASK-004',
            name: 'Testing',
            percent: Math.round(variance(45, 0.2)),
            actual: Math.round(variance(22 * baseMultiplier, 0.15)),
            baseline: Math.round(variance(20 * baseMultiplier, 0.15)),
            var: Math.round(variance(2 * baseMultiplier, 0.3)),
            spi: Number(variance(0.82, 0.1).toFixed(2)),
            cpi: Number(variance(0.89, 0.1).toFixed(2)),
            health: Math.round(variance(65, 0.15)),
            status: 'Critical'
        },
        {
            id: 'TASK-005',
            name: 'Documentation',
            percent: Math.round(variance(80, 0.15)),
            actual: Math.round(variance(16 * baseMultiplier, 0.15)),
            baseline: Math.round(18 * baseMultiplier),
            var: Math.round(variance(-2 * baseMultiplier, 0.3)),
            spi: Number(variance(0.98, 0.1).toFixed(2)),
            cpi: Number(variance(1.15, 0.1).toFixed(2)),
            health: Math.round(variance(88, 0.12)),
            status: 'Normal'
        },
        {
            id: 'TASK-006',
            name: 'UI Design',
            percent: Math.round(variance(55, 0.2)),
            actual: Math.round(variance(24 * baseMultiplier, 0.15)),
            baseline: Math.round(22 * baseMultiplier),
            var: Math.round(variance(2 * baseMultiplier, 0.3)),
            spi: Number(variance(0.85, 0.1).toFixed(2)),
            cpi: Number(variance(0.92, 0.1).toFixed(2)),
            health: Math.round(variance(70, 0.15)),
            status: 'Warning'
        },
    ];

    // Additional tasks for monthly view
    const monthlyTasks = [
        {
            id: 'TASK-007',
            name: 'Security Audit',
            percent: Math.round(variance(90, 0.15)),
            actual: Math.round(variance(18 * baseMultiplier, 0.15)),
            baseline: Math.round(20 * baseMultiplier),
            var: Math.round(variance(-2 * baseMultiplier, 0.3)),
            spi: Number(variance(1.05, 0.08).toFixed(2)),
            cpi: Number(variance(1.10, 0.08).toFixed(2)),
            health: Math.round(variance(90, 0.1)),
            status: 'Normal'
        },
        {
            id: 'TASK-008',
            name: 'Performance Optimization',
            percent: Math.round(variance(70, 0.2)),
            actual: Math.round(variance(26 * baseMultiplier, 0.15)),
            baseline: Math.round(24 * baseMultiplier),
            var: Math.round(variance(2 * baseMultiplier, 0.3)),
            spi: Number(variance(0.92, 0.1).toFixed(2)),
            cpi: Number(variance(0.96, 0.1).toFixed(2)),
            health: Math.round(variance(75, 0.15)),
            status: 'Normal'
        },
        {
            id: 'TASK-009',
            name: 'Integration Testing',
            percent: Math.round(variance(50, 0.2)),
            actual: Math.round(variance(30 * baseMultiplier, 0.15)),
            baseline: Math.round(28 * baseMultiplier),
            var: Math.round(variance(2 * baseMultiplier, 0.3)),
            spi: Number(variance(0.86, 0.1).toFixed(2)),
            cpi: Number(variance(0.88, 0.1).toFixed(2)),
            health: Math.round(variance(72, 0.15)),
            status: 'Warning'
        },
        {
            id: 'TASK-010',
            name: 'Deployment Setup',
            percent: Math.round(variance(85, 0.15)),
            actual: Math.round(variance(14 * baseMultiplier, 0.15)),
            baseline: Math.round(16 * baseMultiplier),
            var: Math.round(variance(-2 * baseMultiplier, 0.3)),
            spi: Number(variance(1.02, 0.08).toFixed(2)),
            cpi: Number(variance(1.14, 0.08).toFixed(2)),
            health: Math.round(variance(87, 0.12)),
            status: 'Normal'
        },
    ];

    // Return different number of tasks based on frequency
    let tasks;
    if (frequency === 'daily') {
        tasks = baseTasks; // 3 tasks for daily
    } else if (frequency === 'weekly') {
        tasks = [...baseTasks, ...weeklyTasks]; // 6 tasks for weekly
    } else {
        tasks = [...baseTasks, ...weeklyTasks, ...monthlyTasks]; // 10 tasks for monthly
    }

    // Calculate KPIs from tasks
    const kpis = calculateKPIs(tasks);

    return { tasks, kpis };
};

// S-Curve data by frequency
export const getEmployeeSCurveData = (frequency, selectedMonth) => {
    const monthInfo = getMonthInfo(selectedMonth);

    if (frequency === 'daily') {
        return Array.from({ length: Math.min(monthInfo.daysInMonth, 30) }, (_, i) => {
            const day = i + 1;
            const progress = (day / monthInfo.daysInMonth) * 100;
            return {
                label: `${monthInfo.name} ${day}`,
                planned: Math.round(progress),
                actual: Math.round(variance(progress * 0.94, 0.05))
            };
        });
    } else if (frequency === 'weekly') {
        return [
            { label: `${monthInfo.name} W1`, planned: 20, actual: Math.round(variance(18, 0.1)) },
            { label: `${monthInfo.name} W2`, planned: 45, actual: Math.round(variance(40, 0.1)) },
            { label: `${monthInfo.name} W3`, planned: 70, actual: Math.round(variance(65, 0.1)) },
            { label: `${monthInfo.name} W4`, planned: 100, actual: Math.round(variance(94, 0.05)) },
        ];
    } else {
        const months = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date(selectedMonth + '-01');
            date.setMonth(date.getMonth() - i);
            const label = date.toLocaleDateString('en-US', { month: 'short' });
            const progress = ((6 - i) / 6) * 100;
            months.push({
                label,
                planned: Math.round(progress),
                actual: Math.round(variance(progress * 0.94, 0.05))
            });
        }
        return months;
    }
};

// ============================================
// MANAGER REPORT DATA
// ============================================

export const getManagerTaskMatrix = (frequency, selectedMonth) => {
    return [
        { id: 'TASK-001', spi: Number(variance(0.95, 0.1).toFixed(2)), cpi: Number(variance(1.12, 0.1).toFixed(2)), health: Math.round(variance(85, 0.1)), status: 'Normal' },
        { id: 'TASK-002', spi: Number(variance(0.88, 0.1).toFixed(2)), cpi: Number(variance(0.94, 0.1).toFixed(2)), health: Math.round(variance(68, 0.1)), status: 'Warning' },
        { id: 'TASK-003', spi: Number(variance(0.78, 0.1).toFixed(2)), cpi: Number(variance(0.82, 0.1).toFixed(2)), health: Math.round(variance(58, 0.1)), status: 'Critical' },
        { id: 'TASK-004', spi: Number(variance(1.05, 0.08).toFixed(2)), cpi: Number(variance(1.08, 0.08).toFixed(2)), health: Math.round(variance(88, 0.08)), status: 'Normal' },
    ];
};

// EVM data by frequency
export const getManagerEVMData = (frequency, selectedMonth) => {
    const monthInfo = getMonthInfo(selectedMonth);
    const baseEV = 315;

    if (frequency === 'daily') {
        return Array.from({ length: Math.min(monthInfo.daysInMonth, 30) }, (_, i) => {
            const day = i + 1;
            const basePV = (day / monthInfo.daysInMonth) * baseEV;
            return {
                label: `${monthInfo.name} ${day}`,
                pv: Math.round(basePV),
                ev: Math.round(variance(basePV * 0.96, 0.03)),
                ac: Math.round(variance(basePV * 0.92, 0.03))
            };
        });
    } else if (frequency === 'weekly') {
        return [
            { label: `${monthInfo.name} W1`, pv: 80, ev: Math.round(variance(75, 0.05)), ac: Math.round(variance(78, 0.05)) },
            { label: `${monthInfo.name} W2`, pv: 160, ev: Math.round(variance(150, 0.05)), ac: Math.round(variance(156, 0.05)) },
            { label: `${monthInfo.name} W3`, pv: 240, ev: Math.round(variance(225, 0.05)), ac: Math.round(variance(232, 0.05)) },
            { label: `${monthInfo.name} W4`, pv: 315, ev: Math.round(variance(302, 0.03)), ac: Math.round(variance(291, 0.03)) },
        ];
    } else {
        const months = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date(selectedMonth + '-01');
            date.setMonth(date.getMonth() - i);
            const label = date.toLocaleDateString('en-US', { month: 'short' });
            const basePV = ((6 - i) / 6) * baseEV;
            months.push({
                label,
                pv: Math.round(basePV),
                ev: Math.round(variance(basePV * 0.96, 0.03)),
                ac: Math.round(variance(basePV * 0.92, 0.03))
            });
        }
        return months;
    }
};

// ============================================
// ADMIN REPORT DATA
// ============================================

export const getAdminProjectBudgetData = (frequency, selectedMonth) => {
    const multiplier = frequency === 'daily' ? 1 : frequency === 'weekly' ? 4 : 30;
    return [
        { name: 'PROJ-001', allocated: 450 * multiplier, spent: Math.round(variance(290.9 * multiplier, 0.05)), remaining: Math.round(variance(159.1 * multiplier, 0.1)) },
        { name: 'PROJ-002', allocated: 320 * multiplier, spent: Math.round(variance(248.5 * multiplier, 0.05)), remaining: Math.round(variance(71.5 * multiplier, 0.1)) },
        { name: 'PROJ-003', allocated: 180 * multiplier, spent: Math.round(variance(165.8 * multiplier, 0.05)), remaining: Math.round(variance(14.2 * multiplier, 0.15)) },
    ];
};

export const adminRiskMap = [
    { id: 'PROJ-001', health: 'Normal', percentUsed: 64 },
    { id: 'PROJ-002', health: 'Warning', percentUsed: 77 },
    { id: 'PROJ-003', health: 'Critical', percentUsed: 92 },
];

export const getAdminMemberCostData = (frequency, selectedMonth, projectId) => {
    // Simulate member data based on project
    let members = [];
    if (projectId === 'PROJ-001') {
        members = [
            { name: 'Alice Johnson', role: 'Senior Dev', rate: 150 },
            { name: 'Bob Smith', role: 'Lead Dev', rate: 180 },
            { name: 'Charlie Brown', role: 'Designer', rate: 130 },
            { name: 'Diana Prince', role: 'PM', rate: 160 },
            { name: 'Evan Wright', role: 'QA', rate: 110 }
        ];
    } else if (projectId === 'PROJ-002') {
        members = [
            { name: 'Frank Miller', role: 'Cloud Architect', rate: 190 },
            { name: 'Grace Hopp', role: 'DevOps', rate: 170 },
            { name: 'Heidi Klum', role: 'Backend Dev', rate: 150 },
            { name: 'Ivan Drago', role: 'Security', rate: 160 }
        ];
    } else {
        members = [
            { name: 'Jack Ryan', role: 'Mobile Lead', rate: 175 },
            { name: 'Kelly Kapowski', role: 'iOS Dev', rate: 140 },
            { name: 'Leo Leo', role: 'Android Dev', rate: 140 },
            { name: 'Mia Therm', role: 'UI/UX', rate: 125 }
        ];
    }

    const monthInfo = getMonthInfo(selectedMonth);
    const multiplier = frequency === 'daily' ? 1 : frequency === 'weekly' ? 5 : 20;

    return members.map((member, index) => {
        const hours = Math.round(variance(40 * multiplier, 0.2));
        const efficiency = Math.round(variance(95, 0.1));
        const allocatedHours = Math.round(hours / (efficiency / 100)); // Estimated based on efficiency
        const billingRate = Math.round(member.rate * 1.5); // 50% margin
        const cost = hours * member.rate;
        const revenue = hours * billingRate;
        const profit = revenue - cost;

        return {
            id: `MEM-${index + 1}`,
            name: member.name,
            role: member.role,
            hourlyCostRate: member.rate,
            billingRate: billingRate,
            allocatedHours: allocatedHours,
            actualHours: hours,
            actualCost: cost,
            revenue: revenue,
            profit: profit,
            efficiency: efficiency
        };
    });
};

export const getAdminTaskCostData = (frequency, selectedMonth, projectId) => {
    // Reuse manager task logic but adapt for admin view
    let tasks = [];

    if (projectId === 'PROJ-001') {
        tasks = [
            { id: 'T-101', name: 'Requirements Analysis', budget: 5000 },
            { id: 'T-102', name: 'System Architecture', budget: 8000 },
            { id: 'T-103', name: 'Frontend Development', budget: 15000 },
            { id: 'T-104', name: 'Backend API', budget: 12000 },
            { id: 'T-105', name: 'Testing & QA', budget: 6000 }
        ];
    } else if (projectId === 'PROJ-002') {
        tasks = [
            { id: 'T-201', name: 'AWS Setup', budget: 10000 },
            { id: 'T-202', name: 'Data Migration Scripts', budget: 12000 },
            { id: 'T-203', name: 'Security Config', budget: 8000 },
            { id: 'T-204', name: 'Load Balancing', budget: 5000 }
        ];
    } else {
        tasks = [
            { id: 'T-301', name: 'UI Prototyping', budget: 6000 },
            { id: 'T-302', name: 'iOS Development', budget: 18000 },
            { id: 'T-303', name: 'Android Development', budget: 18000 },
            { id: 'T-304', name: 'API Integration', budget: 8000 },
            { id: 'T-305', name: 'App Store Submission', budget: 2000 }
        ];
    }

    return tasks.map(task => {
        const spent = Math.round(variance(task.budget * (projectId === 'PROJ-003' ? 0.95 : 0.7), 0.3));
        const varianceVal = task.budget - spent; // Existing calculation

        // New derived fields
        const hourlyRate = 75;
        const plannedHours = Math.round(task.budget / hourlyRate);
        const actualHours = Math.round(spent / hourlyRate);
        const hoursVariance = actualHours - plannedHours;
        const costVariance = spent - task.budget; // Manager style: Actual - Planned
        const variancePercent = Math.round((costVariance / task.budget) * 100);

        // Mock KPIs
        const cpi = Number((task.budget / spent).toFixed(2));
        const spi = Number(variance(cpi, 0.1).toFixed(2));
        const health = Math.round(variance(cpi * 85, 0.1));

        return {
            id: task.id,
            name: task.name,
            budget: task.budget,
            spent: spent,
            variance: varianceVal,
            status: varianceVal >= 0 ? 'Under Budget' : 'Over Budget',
            // New Fields
            plannedHours,
            actualHours,
            hoursVariance,
            costVariance,
            variancePercent,
            cpi,
            spi,
            health
        };
    });
};

export const getAdminProjectMonthlyCostData = (frequency, selectedMonth, projectId) => {
    // Generate 12 months of data for the project
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Different base parameters for each project
    let baseBudget = 45000;
    let seasonalOffset = 0;

    if (projectId === 'PROJ-002') {
        baseBudget = 32000;
        seasonalOffset = 2; // Different peak
    } else if (projectId === 'PROJ-003') {
        baseBudget = 25000;
        seasonalOffset = 5;
    }

    return months.map((month, index) => {
        const seasonality = 1 + (Math.sin((index + seasonalOffset) / 2) * 0.2); // Fluctuate budget
        const plannedBudget = Math.round(baseBudget * seasonality);
        const plannedHours = Math.round(plannedBudget / 75); // Approx $75/hr rate

        // Simulate actuals with some variance, PROJ-003 is riskier
        const riskFactor = projectId === 'PROJ-003' ? 0.3 : 0.1;
        const cpi = (projectId === 'PROJ-003' ? 0.8 : 1.0) + ((Math.random() - 0.5) * riskFactor);
        const spi = (projectId === 'PROJ-003' ? 0.9 : 1.0) + ((Math.random() - 0.5) * riskFactor);

        const ev = Math.round(plannedBudget * spi);
        const actualCost = Math.round(ev / cpi);
        const actualHours = Math.round(actualCost / 75);

        const sv = ev - plannedBudget;
        const cv = ev - actualCost;

        return {
            month,
            plannedHours,
            plannedBudget,
            actualHours,
            actualCost,
            ev,
            sv,
            cv,
            spi: Number(spi.toFixed(2)),
            cpi: Number(cpi.toFixed(2)),
            status: spi >= 0.95 && cpi >= 0.95 ? 'On Track' : (spi < 0.8 || cpi < 0.8 ? 'At Risk' : 'Warning')
        };
    });
};

// ============================================
// EXECUTIVE REPORT DATA
// ============================================

export const executiveBenchmarkData = [
    { metric: 'SPI', industry: 0.90, our: Number(variance(0.99, 0.05).toFixed(2)) },
    { metric: 'CPI', industry: 0.95, our: Number(variance(1.01, 0.05).toFixed(2)) },
    { metric: 'ROI', industry: 15, our: Math.round(variance(22, 0.1)) },
    { metric: 'On-Time', industry: 80, our: Math.round(variance(92, 0.05)) },
];

export const executivePortfolioMetrics = [
    { project: 'PROJ-001', spi: Number(variance(0.96, 0.08).toFixed(2)), cpi: Number(variance(1.04, 0.08).toFixed(2)) },
    { project: 'PROJ-002', spi: Number(variance(0.88, 0.08).toFixed(2)), cpi: Number(variance(0.98, 0.08).toFixed(2)) },
    { project: 'PROJ-003', spi: Number(variance(1.02, 0.08).toFixed(2)), cpi: Number(variance(1.08, 0.08).toFixed(2)) },
];

export const executiveRadarData = [
    { subject: 'Schedule', A: Math.round(variance(85, 0.1)), fullMark: 100 },
    { subject: 'Budget', A: Math.round(variance(92, 0.08)), fullMark: 100 },
    { subject: 'Quality', A: Math.round(variance(78, 0.12)), fullMark: 100 },
    { subject: 'Resources', A: Math.round(variance(88, 0.1)), fullMark: 100 },
    { subject: 'Risk', A: Math.round(variance(65, 0.15)), fullMark: 100 },
    { subject: 'Scope', A: Math.round(variance(90, 0.08)), fullMark: 100 },
];

// Executive EVM data by frequency
export const getExecutiveEVMData = (frequency, selectedMonth) => {
    const monthInfo = getMonthInfo(selectedMonth);
    const baseEV = 712.5;

    if (frequency === 'daily') {
        return Array.from({ length: Math.min(monthInfo.daysInMonth, 30) }, (_, i) => {
            const day = i + 1;
            const basePV = (day / monthInfo.daysInMonth) * baseEV;
            return {
                label: `${monthInfo.name} ${day}`,
                pv: Math.round(basePV),
                ev: Math.round(variance(basePV * 0.99, 0.02)),
                ac: Math.round(variance(basePV * 0.975, 0.02))
            };
        });
    } else if (frequency === 'weekly') {
        return [
            { label: `${monthInfo.name} W1`, pv: 180, ev: Math.round(variance(170, 0.03)), ac: Math.round(variance(165, 0.03)) },
            { label: `${monthInfo.name} W2`, pv: 360, ev: Math.round(variance(340, 0.03)), ac: Math.round(variance(330, 0.03)) },
            { label: `${monthInfo.name} W3`, pv: 540, ev: Math.round(variance(510, 0.03)), ac: Math.round(variance(498, 0.03)) },
            { label: `${monthInfo.name} W4`, pv: 712.5, ev: Math.round(variance(705.2, 0.02)), ac: Math.round(variance(695.3, 0.02)) },
        ];
    } else {
        const months = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date(selectedMonth + '-01');
            date.setMonth(date.getMonth() - i);
            const label = date.toLocaleDateString('en-US', { month: 'short' });
            const basePV = ((6 - i) / 6) * baseEV;
            months.push({
                label,
                pv: Math.round(basePV),
                ev: Math.round(variance(basePV * 0.99, 0.02)),
                ac: Math.round(variance(basePV * 0.975, 0.02))
            });
        }
        return months;
    }
};
