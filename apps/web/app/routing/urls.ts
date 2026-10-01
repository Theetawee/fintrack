type RouteNameType =
  | 'Categories'
  | 'Budgets'
  | 'Accounts'
  | 'Home'
  | 'Goals'
  | 'Transactions'
  | 'QuickAdd'
  | 'Reports'
  | 'Insights'
  | 'RulesAndRecurring'
  | 'AuditLog'
  | 'BankSyncCallback'
  | 'NotFound'
  | 'Login'
  | 'Settings'
  | 'Authentication'
  | 'RequestActivation'
  | 'AccountActivation'
interface RouteType {
  name: RouteNameType
  path: string
}

// Define your routes with parameter placeholders
const urlpatterns: RouteType[] = [
  { name: 'Home', path: '/' },
  { name: 'Categories', path: '/categories' },
  { name: 'Budgets', path: '/budgets' },
  { name: 'Accounts', path: '/accounts' },
  { name: 'Goals', path: '/goals' },
  { name: 'Transactions', path: '/transactions' },
  { name: 'QuickAdd', path: '/quick-add' },
  { name: 'Reports', path: '/reports' },
  { name: 'Insights', path: '/insights' },
  { name: 'RulesAndRecurring', path: '/rules-and-recurring' },
  { name: 'AuditLog', path: '/audit-log' },
  { name: 'BankSyncCallback', path: '/bank-sync-callback' },
  { name: 'NotFound', path: '/not-found' },
  { name: 'Login', path: '/login' },
  { name: 'Settings', path: '/settings' },
  { name: 'Authentication', path: '/register' },
  { name: 'RequestActivation', path: '/account-activation' },
  { name: 'AccountActivation', path: '/activate' },
]

// Helper function to replace parameters in the path
const replaceParams = (path: string, params?: Record<string, string | number>) => {
  if (!params) return path

  return path.replace(/:([a-zA-Z_]+)/g, (_, key) => {
    if (params[key] !== undefined) {
      return String(params[key])
    }
    throw new Error(`Missing required param: ${key}`)
  })
}

// Helper function to append query parameters to the path
const addQueryParams = (path: string, query?: Record<string, string | number>) => {
  if (!query || Object.keys(query).length === 0) return path
  const queryString = new URLSearchParams(query as Record<string, string>).toString()
  return `${path}?${queryString}`
}

// **Final getPath function** - Supports path parameters, query parameters, or both
export const getPath = (
  name: RouteNameType,
  params?: Record<string, string | number>,
  query?: Record<string, string | number>,
): string => {
  const route = urlpatterns.find((route) => route.name === name)
  if (!route) throw new Error(`Route "${name}" not found`)

  // Replace path parameters
  const finalPath = replaceParams(route.path, params)

  // Append query parameters
  return addQueryParams(finalPath, query)
}
