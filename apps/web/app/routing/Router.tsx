import { Route, Routes } from 'react-router'

import '@/assets/styles/globals.css'
import { getPath } from './urls'
import AppLayout from '../layouts/AppLayout'
import AuthLayout from '../layouts/AuthLayout'
import NotFoundPage from '@/pages/not-found'
import { lazy } from 'react'

const DashboardPage = lazy(() => import('@/pages/dashboard'))
const CategoriesPage = lazy(() => import('@/pages/category'))
const BudgetsPage = lazy(() => import('@/pages/budget'))
const AccountsPage = lazy(() => import('@/pages/accounts'))
const SavingsGoalsPage = lazy(() => import('@/pages/savings-goals'))
const TransactionsPage = lazy(() => import('@/pages/transactions'))
const QuickAddPage = lazy(() => import('@/pages/quick-add'))
const ReportsPage = lazy(() => import('@/pages/reports'))
const InsightsPage = lazy(() => import('@/pages/insights'))
const RulesAndRecurringPage = lazy(() => import('@/pages/rules'))
const AuditLogPage = lazy(() => import('@/pages/audit-log'))
const BankSyncCallbackPage = lazy(() => import('@/pages/bank-sync-callback'))
const UserSettingsPage = lazy(() => import('@/pages/settings'))
const AuthenticationPage = lazy(() => import('@/pages/authentication'))
const LoginPage = lazy(() => import('@/pages/login'))

const Router = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={getPath('Home')} element={<DashboardPage />} />
        <Route path={getPath('Categories')} element={<CategoriesPage />} />
        <Route path={getPath('Budgets')} element={<BudgetsPage />} />
        <Route path={getPath('Accounts')} element={<AccountsPage />} />
        <Route path={getPath('Goals')} element={<SavingsGoalsPage />} />
        <Route path={getPath('Transactions')} element={<TransactionsPage />} />
        <Route path={getPath('QuickAdd')} element={<QuickAddPage />} />
        <Route path={getPath('Reports')} element={<ReportsPage />} />
        <Route path={getPath('Insights')} element={<InsightsPage />} />
        <Route path={getPath('RulesAndRecurring')} element={<RulesAndRecurringPage />} />
        <Route path={getPath('AuditLog')} element={<AuditLogPage />} />
        <Route path={getPath('BankSyncCallback')} element={<BankSyncCallbackPage />} />
        <Route path={getPath('Settings')} element={<UserSettingsPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path={getPath('Authentication')} element={<AuthenticationPage />} />
        <Route path={getPath('Login')} element={<LoginPage />} />
      </Route>
      <Route path={getPath('NotFound')} element={<NotFoundPage />} />
    </Routes>
  )
}

export default Router
