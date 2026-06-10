# 🧠 Functions Guide — ARQA Coffee

**Complete catalog of all global functions for porting to a new platform.**

---

> **Note:** All functions are globally defined (no modules/imports). ~200+ functions total.
> File paths relative to project root.

---

## 1. Data & Helpers

### `data/db.js` (2 functions)

| Function | Description |
|---|---|
| `loadDB()` | Reads and parses `arqa_db` from localStorage |
| `saveDB()` | Writes `DB` object as JSON to localStorage key `arqa_db` |

### `helpers.js` (25 functions)

| Function | Description |
|---|---|
| `getOrderTypeName(t)` | Returns Indonesian label: `Dine-In` / `Takeaway` / `Delivery` |
| `getStatusLabel(s)` | Returns Indonesian status label from status key |
| `getStatusBadge(s)` | Returns CSS class name for status badge styling |
| `formatCurrency(n)` | Formats number to `"Rp 18.000"` using `id-ID` locale |
| `formatDate(d)` | Formats ISO date to Indonesian short format |
| `formatTime(d)` | Formats ISO date to `HH:MM` time string |
| `genId()` | Generates order ID: `"o" + Date.now(36) + random(4)` |
| `getMenuItem(id)` | Finds menu item by ID in `DB.menuItems` |
| `getUser(id)` | Finds user by ID in `DB.users` |
| `getTable(id)` | Finds table by ID in `DB.tables` |
| `getShippingConfig()` | Returns shipping rate config from `DB.cafe.shipping` |
| `calcShippingCost(lat, lng)` | Calculates shipping cost based on Haversine distance |
| `calcItemTax(items)` | Calculates total tax from items' `tax_percentage` |
| `calcCustomerFee(subtotal, orderType)` | Calculates customer service fee |
| `calcCourierFee(shippingCost)` | Calculates courier platform fee from shipping cost |
| `effectiveAmount(o)` | Calculates net revenue after courier ongkir deduction |
| `calcMitraFee(total)` | Calculates mitra platform fee percentage |
| `isCheckedIn()` | Checks if current user has checked in today |
| `hasActiveCourier()` | Checks if at least one courier is checked in today |
| `isMitraActive(mitraName)` | Checks if a specific mitra is checked in today |
| `createMitraPayouts(orderId)` | Creates mitra payout records for order items |
| `getMitraPendingPayouts()` | Returns all unpaid mitra payouts |
| `getMitraPaidPayouts()` | Returns all paid mitra payouts |
| `ARQA_COORDS` (constant) | Cafe location from `DB.cafe.location` |
| `ARQA_RADIUS` (constant) | Geo-fence radius for check-in (200m) |

---

## 2. Core Components

### `components/toast.js` (1 function)

| Function | Description |
|---|---|
| `showToast(msg, type)` | Shows auto-dismiss toast notification (3.5s) |

### `components/modal.js` (4 functions)

| Function | Description |
|---|---|
| `showModal(html, callback)` | Creates modal overlay with content; callback fires 50ms later |
| `closeModal()` | Removes modal, stops QR scanner, cleans map instances |
| `showMenuItem(id)` | Shows menu item detail modal with promo pricing and quantity |
| `updateModalQty(d)` | Increments/decrements quantity stepper in item modal |

### `components/notifications.js` (18 functions)

| Function | Description |
|---|---|
| `loadNotifications()` | Loads notifications from `arqa_notifications` localStorage key |
| `saveNotifications()` | Saves notifications array to localStorage |
| `sendBrowserNotification(title, body)` | Sends browser push notification |
| `addNotification(opts)` | Creates notification with title/message/type/icon/targetRoles |
| `getRoleNotifications()` | Returns notifications targeting current user's role |
| `getUnreadCount()` | Returns count of unread notifications for current role |
| `getChatUnreadCount()` | Returns count of unread chat messages for customer/courier |
| `markAllChatAsRead()` | Marks all chat messages as read for current user |
| `markAsRead(notifId)` | Marks single notification as read for current role |
| `markAllAsRead()` | Marks all role notifications as read |
| `getNotifColor(type)` | Returns hex color for notification type |
| `renderNotifPanel()` | Renders notification panel inside a modal |
| `notifyOrderPlaced(order, customerName)` | Creates notifications for new order placed |
| `notifyStatusChange(order, newStatus)` | Creates notifications for order status changes |
| `notifyPayment(order, method)` | Creates notifications for payment confirmed |
| `notifyRejected(order, reason, rejectedNames)` | Creates notifications for rejected items |
| `notifyDeliveryTaken(order, courierName)` | Creates notification for delivery pickup |
| `notifyDeliveryCompleted(order)` | Creates notification for delivery completed |
| `notifyNewChatMessage(orderId, senderName)` | Creates notification for new chat message |
| `notifyLowStock(item)` | Creates notification for low stock alert |

### `components/hooks.js` (5 functions)

| Function | Description |
|---|---|
| `afterRender()` | Post-render hook that runs charts, maps, carousel, timers |
| `initCharts()` | Destroys stale Chart.js instances and creates new ones |
| `initMaps()` | Initializes Leaflet maps for courier tracking and check-in |
| `initPlaygroundTimer()` | Starts 1-second interval updating playground countdown |
| `initServiceStatusTimer()` | Polls service status every 15s for auto-render |

---

## 3. View Core

### `view/core/render.js` (1 function)

| Function | Description |
|---|---|
| `render()` | Main render: login if no user, main app otherwise, runs hooks |

### `view/core/login.js` (15 functions)

| Function | Description |
|---|---|
| `renderLogin()` | Renders full login screen with role cards, form, registration links |
| `showServiceClosedPopup()` | Shows modal: "Layanan Tutup" |
| `quickLogin(role)` | One-click login by finding user with matching role |
| `handleLogin()` | Email/password login from form inputs |
| `getDefaultTab(role)` | Returns default tab ID for each role |
| `showCustomerRegisterModal()` | Shows customer registration form modal |
| `registerCustomer()` | Validates and creates new customer user |
| `showForgotPasswordModal()` | Shows forgot password modal |
| `resetPassword()` | Resets user password to "password123" |
| `showMitraRegistrationModal()` | Shows mitra registration modal with role selection |
| `selectMitraRole(role)` | Selects mitra role and shows relevant form fields |
| `initMitraRegMap()` | Initializes Leaflet map for mitra position selection |
| `updateMitraRegPosDisplay(lat, lng)` | Updates position coordinate display for mitra registration |
| `submitMitraRegistration()` | Validates and submits mitra/courier registration |
| `afterLoginRender()` | Post-login hook (currently empty) |

### `view/core/shell.js` (8 functions)

| Function | Description |
|---|---|
| `renderMainApp()` | Renders app shell with header, bottom nav, sidebar, content |
| `getRoleLabel(r)` | Returns Indonesian role label from role key |
| `renderBottomNav(role)` | Renders bottom navigation tabs for the given role |
| `renderSideDrawer(role)` | Renders side drawer with nested menu for admin/manager |
| `toggleDrawer()` | Toggles sidebar open/close state |
| `switchTab(id)` | Sets current tab for role and re-renders |
| `handleLogout()` | Clears session, state, maps, charts and returns to login |
| `showNotifPanel()` | Opens notification panel modal |

### `view/core/profile.js` (11 functions)

| Function | Description |
|---|---|
| `calcDistance(lat1, lon1, lat2, lon2)` | Haversine distance calculation in meters |
| `renderGenericProfile()` | Renders profile page for all roles except customer |
| `renderGeoAttendanceCard(u, att)` | Renders check-in/check-out card for attendance |
| `showGeoAttendanceModal()` | Shows geo attendance modal with map |
| `initModalCheckinMap()` | Initializes Leaflet map in check-in modal |
| `modalCheckIn()` | Performs check-in with geo-coordinates from modal |
| `modalCheckOut()` | Delegates to staffCheckOut after closing modal |
| `staffCheckIn()` | Performs check-in from profile page with geo validation |
| `staffCheckOut()` | Performs check-out with optional GPS location |
| `showEditProfileModal()` | Shows edit profile modal with password change |
| `saveEditProfile()` | Saves profile changes including password |

---

## 4. Admin View

### `view/admin/overview.js` (24 functions)

| Function | Description |
|---|---|
| `renderAdminView()` | Routes admin tabs to appropriate render function |
| `renderAdminCourierFinance()` | Renders courier financial report with filters |
| `renderAdminMitraFinance()` | Renders mitra financial report with mitra selector |
| `renderAdminMitraApproval()` | Renders mitra registration approval page |
| `approveMitraRegistration(id)` | Approves mitra registration and creates user |
| `rejectMitraRegistration(id)` | Rejects mitra registration |
| `renderAdminOverview()` | Renders admin dashboard with stats, charts, alerts |
| `isServiceClosed()` | Checks if service is closed (schedule + manual override) |
| `isWithinScheduleHours()` | Checks if current time is within operating hours |
| `renderServiceControl()` | Renders service control panel with schedule editor |
| `toggleServiceStatus()` | Toggles between open/closed/force_open states |
| `updateScheduleTime(day, field, value)` | Updates single day's open/close time |
| `saveServiceSchedule()` | Saves schedule and shows success toast |
| `addSpecialDate()` | Shows modal to add special date exception |
| `confirmSpecialDate()` | Validates and saves special date |
| `removeSpecialDate(id)` | Removes a special date entry |
| `showTableDetail(id)` | Shows table detail modal with active orders |
| `showPilihStokModal()` | Shows modal to choose Cafe or Playground stock view |
| `saveTarifKurir()` | Saves courier shipping rate and fee config |
| `saveTarifMitra()` | Saves mitra platform fee config |
| `saveTarifPelanggan()` | Saves customer service fee config |
| `renderTarifKurir()` | Renders courier rate settings form |
| `renderTarifMitra()` | Renders mitra rate settings form |
| `renderTarifPelanggan()` | Renders customer rate settings form |
| `renderPengaturanTarif()` | Renders all rate settings together |
| `showActiveLayananModal(role)` | Shows modal to pick active orders or active playground |

### `view/admin/users.js` (7 functions)

| Function | Description |
|---|---|
| `renderAdminUsers()` | Renders user management with role filter chips |
| `showAddUserModal()` | Shows add user form modal |
| `addUser()` | Creates new user from form data |
| `showEditUserModal(id)` | Shows edit user form modal |
| `saveEditUser(id)` | Saves user edits including role change |
| `deleteUser(id)` | Shows delete user confirmation modal |
| `confirmDeleteUser(id)` | Removes user from DB |

---

## 5. Cashier View

### `view/cashier/orders.js` (12 functions)

| Function | Description |
|---|---|
| `showPaymentModal(id)` | Shows payment method selection (QRIS/Transfer/Tunai) |
| `showCashierQRIS(id)` | Shows QRIS payment QR code modal |
| `showCashierTransfer(id)` | Shows bank transfer details modal |
| `confirmCashierPayment(id, method)` | Confirms payment and creates mitra payouts |
| `confirmCompleteOrder(id)` | Shows complete order confirmation modal |
| `doCompleteOrder(id)` | Completes order, frees table, notifies status change |
| `renderCashierView()` | Routes cashier tabs to render functions |
| `renderCashierOrders()` | Renders order list with pending payments and mitra payouts |
| `showOngkirPaymentModal(id)` | Shows ongkir payment detail modal |
| `printOngkirInvoice(id)` | Opens print window for courier ongkir invoice |
| `printCashierInvoice(id)` | Opens print window for cashier invoice |
| `showCashierActiveOrderDetail(id)` | Shows full order detail modal |

### `view/cashier/finalize.js` (3 functions)

| Function | Description |
|---|---|
| `submitCashierOrder()` | Shows manual order form with customer/table/payment |
| `finalizeManualOrder()` | Creates or updates manual cashier order |
| `filterCashierMenu(q)` | Filters cashier menu items by search query |

### `view/cashier/create-order.js` (3 functions)

| Function | Description |
|---|---|
| `renderCashierCreateOrder()` | Renders manual cashier order creation form |
| `addCashierCart(id)` | Adds item to cashier manual cart |
| `updateCashierCartQty(idx, d)` | Updates cashier cart item quantity |

### `view/cashier/donetoday.js` (9 functions)

| Function | Description |
|---|---|
| `acceptCashierOrder(id)` | Accepts pending order, notifies kitchen |
| `processCashPayment(id)` | Marks order as paid via cash |
| `settleDelivery(id)` | Settles COD delivery (paid + completed) |
| `cashierSettleDineIn(id)` | Settles waiter dine-in delivery (paid + completed) |
| `payOngkir(id)` | Pays courier ongkir fee |
| `renderCashTable()` | Renders cash payments detail table |
| `renderDigitalTable()` | Renders digital payments detail table |
| `renderCashierReport()` | Renders cashier daily report with cash/digital tables |
| `renderCashierProfile()` | Renders cashier profile page |

### `view/cashier/edit.js` (3 functions)

| Function | Description |
|---|---|
| `cancelCashierOrder(id)` | Shows cancellation confirmation for pending order |
| `confirmCancelCashierOrder(id)` | Cancels order, frees table, sends notification |
| `editCashierOrder(id)` | Loads order items into cashier cart for editing |

---

## 6. Kitchen View

### `view/kitchen/queue.js`

| Function | Description |
|---|---|
| `renderKitchenView()` | Routes kitchen tabs (queue/history/profile) |
| `renderKitchenQueue()` | Renders cooking queue in real-time |

### `view/kitchen/history.js`

| Function | Description |
|---|---|
| `renderKitchenHistory()` | Renders completed/cancelled kitchen orders |

### `view/kitchen/status.js`

| Function | Description |
|---|---|
| `updateItemStatus(orderId, itemIndex, status)` | Updates single item status, checks if all ready |
| `rejectOrderItem(orderId, itemIndex, reason)` | Rejects item, optionally rejects whole order |

---

## 7. Courier View

### `view/courier/available.js`

| Function | Description |
|---|---|
| `renderCourierView()` | Routes courier tabs |
| `renderCourierAvailable()` | Renders available delivery orders for pickup |

### `view/courier/accept.js`

| Function | Description |
|---|---|
| `acceptDelivery(id)` | Assigns courier to order, status → delivering |

### `view/courier/active.js`

| Function | Description |
|---|---|
| `renderCourierActive()` | Renders active delivery with map |
| `initCourierMap(orderId)` | Initializes Leaflet map for delivery tracking |
| `simulateMove(orderId)` | Generates random GPS movement simulation |
| `completeDelivery(id)` | Completes delivery, handles COD vs paid |

### `view/courier/history.js`

| Function | Description |
|---|---|
| `renderCourierHistory()` | Renders completed deliveries with date filter |

---

## 8. Customer View

### `view/customer/menu.js` (5 functions)

| Function | Description |
|---|---|
| `renderCustomerView()` | Routes customer tabs (menu/cart/orders/profile) |
| `renderCustomerMenu()` | Renders menu grid with promos, filters, mitra badges |
| `isPromoUsedByUser(promoId)` | Checks if current user already used promo |
| `isPromoActiveByDate(p)` | Checks if promo is within start/end date range |
| `getGreeting()` | Returns time-based greeting: Pagi/Siang/Malam |
| `initPromoCarousel()` | Initializes auto-rotating promo carousel with drag |

### `view/customer/cart.js` (11 functions)

| Function | Description |
|---|---|
| `showMenuItem(id)` | Shows menu item detail modal (overrides modal.js version) |
| `addToCart(id)` | Adds item to customer cart with dedup by notes |
| `renderEmptyCart()` | Renders empty cart placeholder |
| `renderCartItem(c, i, eligible, discUnitPrice)` | Renders single cart item card |
| `renderCartItems(cart, activePromo)` | Renders all cart items |
| `renderPromoBanner(activePromo)` | Renders active promo info banner |
| `renderOrderSummary(total, discount, afterDiscount, shippingCost, serviceFee)` | Renders order totals |
| `renderOrderTypeSelector()` | Renders dine-in/delivery selector with mitra restrictions |
| `renderDeliveryAddress()` | Renders delivery address form with location picker |
| `renderPaymentTiming()` | Renders pay now/later and payment method selector |
| `renderPlaceOrderButton()` | Renders place order action button |
| `renderCustomerCart()` | Renders full cart view with all sections |

### `view/customer/place.js` (3 functions)

| Function | Description |
|---|---|
| `confirmPlaceOrder()` | Shows order confirmation modal with all details |
| `handleDigitalPayment()` | Shows QRIS/Transfer payment modals before placing |
| `placeOrder()` | Creates order from cart, handles dine-in merge logic |

### `view/customer/payment.js` (11 functions)

| Function | Description |
|---|---|
| `selectPayment(p)` | Sets selected payment method and re-renders |
| `isDigitalSelected()` | Returns true if QRIS or bank_transfer selected |
| `selectPayTiming(t)` | Sets pay now/later and re-renders |
| `selectOrderType(t)` | Sets order type with mitra/courier validation |
| `updateCartQty(i, d)` | Updates cart item quantity |
| `removeCartItem(i)` | Removes item from cart |
| `updateCartNotes(i, val)` | Updates cart item notes on blur |
| `getActivePromo()` | Returns active promo object from State |
| `isItemEligible(item, promo)` | Checks if menu item qualifies for promo |
| `calcItemDiscount(item, promo)` | Calculates discounted unit price for item |
| `calcPromoDiscount()` | Calculates total promo discount for cart |

### `view/customer/orders-list.js`, `cancel.js`, `chat.js`, `delivery.js`, `tracking.js`, `profile.js`, `promo-qr.js`

| Function | Description |
|---|---|
| `renderCustomerOrders()` | Renders order list with status tracking |
| `cancelOrder(id)` | Cancels order with confirmation |
| `payOrder(id)` | Customer pays via QRIS from order detail |
| `openChatModal(orderId)` | Opens chat modal between customer and courier |
| `initTrackingMap(orderId)` | Initializes courier tracking map for customer |
| `renderCustomerProfile()` | Renders customer-specific profile with scan QR |
| `startQRScan()` | Starts HTML5 QR scanner for table QR codes |
| `stopQRScanner()` | Stops QR scanner |
| `showPromoQR()` | Shows promo QR code modal |

---

## 9. Waiter View

### `view/waiter/menu.js`

| Function | Description |
|---|---|
| `renderWaiterView()` | Routes waiter tabs (menu/cart/orders/profile) |
| `renderWaiterMenu()` | Renders waiter menu with table selector |

---

## 10. Playground View

### `view/playground/index.js`

| Function | Description |
|---|---|
| `renderPlaygroundView()` | Routes playground tabs (tickets/report/stock/profile) |

### `view/playground/create.js`

| Function | Description |
|---|---|
| `renderPlaygroundCreateTicket()` | Renders ticket wizard step 1 (child data) |
| `renderPgTimeStep()` | Renders ticket wizard step 2 (duration) |
| `renderPgReviewStep()` | Renders ticket wizard step 3 (review + payment) |
| `finalizePlaygroundTicket()` | Saves ticket and updates stock |

### `view/playground/tickets.js`

| Function | Description |
|---|---|
| `renderPlaygroundTickets()` | Renders active/completed ticket list |
| `renderPlaygroundTicketCard(t)` | Renders single ticket card with time bar |
| `addTicketTime(ticketId)` | Adds extra time to active ticket |
| `addTicketItems(ticketId)` | Adds snacks to active ticket |
| `completePlaygroundTicket(id)` | Completes and closes ticket |
| `cancelPlaygroundTicket(id)` | Cancels active ticket |

### `view/playground/report.js`

| Function | Description |
|---|---|
| `renderPlaygroundReport()` | Renders playground financial report |

### `view/playground/stock.js`

| Function | Description |
|---|---|
| `renderPlaygroundPgStock()` | Renders playground stock management |
| `addPgStockItem()` | Adds new playground stock item |
| `adjustPgStock(id, type, qty)` | Adjusts playground stock (in/out) |

---

## 11. Mitra Juru Masak View

### `view/cook/mitra.js`

| Function | Description |
|---|---|
| `renderMitraView()` | Routes mitra tabs (queue/history/menu-mgmt/finance/profile) |
| `renderMitraQueue()` | Renders queue filtered to mitra's own items |
| `renderMitraHistory()` | Renders mitra's completed orders |
| `renderMitraMenuMgmt()` | Renders mitra's own menu management |
| `renderMitraFinance()` | Renders mitra's financial report |
| `toggleMitraService()` | Toggles mitra service on/off |
| `printMitraInvoice(id)` | Prints mitra payout invoice |

---

## 12. Manager View

### `view/manager/index.js`

| Function | Description |
|---|---|
| `renderManagerView()` | Routes manager tabs to shared/admin functions |
| `renderManagerDashboard()` | Renders manager dashboard with stats |

---

## 13. Shared Views

### `view/shared/finance.js` (18 functions)

| Function | Description |
|---|---|
| `getFinanceData(startDate, endDate)` | Computes daily revenue from paid orders |
| `setFinanceRange(startDate, endDate)` | Sets finance date range and re-renders |
| `showFinanceOrderDetail(orderId)` | Shows full order detail in finance report |
| `printRevenueDetail()` | Opens print window for revenue detail |
| `printExpenseDetail()` | Opens print window for expense detail |
| `printAvgDetail()` | Opens print window for daily averages |
| `printProfitDetail()` | Opens print window for profit/loss |
| `showPendapatanModal()` | Shows modal to pick Cafe or Playground revenue |
| `getPlaygroundPeriodOrders(startDate, endDate)` | Filters paid playground tickets by date |
| `getPlaygroundPeriodEntries(startDate, endDate)` | Gets playground entries including extras |
| `getPgMethodBadge(method)` | Returns payment method badge HTML |
| `getMergedDailyEntries(startDate, endDate)` | Merges cafe + playground daily revenue |
| `getCombinedDailyRevenue(startDate, endDate)` | Combines cafe and playground revenue |
| `showExpenseDetail(id)` | Shows expense detail modal |
| `renderFinanceReport()` | Renders full finance report with tables and toggles |

### `view/shared/stock.js`

| Function | Description |
|---|---|
| `renderStockManagement()` | Renders cafe stock management with sort by depletion |
| `addStockItem()` | Adds new stock item |
| `adjustStock(id, type)` | Adjusts stock quantity (in/out) |
| `restockItem(id)` | Opens restock modal (creates expense) |
| `reduceStock(id)` | Opens reduce stock modal |

### `view/shared/expense.js`

| Function | Description |
|---|---|
| `renderExpenseManagement()` | Renders expense management page |
| `addExpense()` | Adds manual expense entry |
| `deleteExpense(id)` | Deletes expense with confirmation |

### `view/shared/attendance.js`

| Function | Description |
|---|---|
| `renderAttendance()` | Renders attendance report for all staff |

### `view/shared/menu-crud.js`

| Function | Description |
|---|---|
| `showAddMenuItemModal()` | Shows add menu item form modal |
| `addMenuItem()` | Creates new menu item |
| `showEditMenuItemModal(id)` | Shows edit menu item form modal |
| `editMenuItem(id)` | Saves menu item changes |

### `view/shared/menu-mgmt.js` (5 functions)

| Function | Description |
|---|---|
| `renderAdminMenuMgmt()` | Renders menu management with approval queue |
| `approveMenuItem(id)` | Approves mitra-submitted menu |
| `rejectMenuItem(id)` | Rejects and deletes mitra-submitted menu |
| `cancelOwnMenuItem(id)` | Cancels own pending menu (mitra) |
| `toggleMenuAvail(id)` | Toggles menu availability with notification |

### `view/shared/tables-mgmt.js`

| Function | Description |
|---|---|
| `renderAdminTablesMgmt()` | Renders table management page |
| `addTable()` | Adds new table with QR code |
| `toggleTableStatus(id)` | Toggles table available/occupied |
| `deleteTable(id)` | Deletes table with confirmation |

### `view/shared/promos.js`

| Function | Description |
|---|---|
| `renderAdminPromos()` | Renders promo management page |
| `addPromo()` | Adds new promo |
| `editPromo()` | Edits existing promo |
| `togglePromo(id)` | Toggles promo active/inactive |
| `deletePromo(id)` | Deletes promo with confirmation |
| `showPromoDetail(id)` | Shows promo detail modal |

### `view/shared/image-helpers.js`

| Function | Description |
|---|---|
| `uploadImage(inputId, callback)` | Handles image upload with preview |

---

## 14. Init & Permissions

### `init.js` (10 functions)

| Function | Description |
|---|---|
| `renderPermissionGate()` | Renders permission request screen (geo, camera, notif) |
| `checkRemainingSilently()` | Checks permissions without prompting |
| `checkPermission(name, onGranted, onDenied)` | Queries permission state for geo/camera |
| `requestActualAPI(name, onGranted, onDenied)` | Triggers actual permission request |
| `requestBothPermissions()` | Requests all permissions simultaneously |
| `checkPermissions()` | Re-renders permission gate after requests |
| `startApp()` | Initializes app: loads session, renders, starts auto-save |

---

## 15. Order & Payment Functions (additional)

Found across cashier and customer views:

| Function | Location | Description |
|---|---|---|
| `acceptCashierOrder(id)` | cashier/orders.js | Accepts cashier order, notifies kitchen |
| `cancelCashierOrder(id)` | cashier/orders.js | Cancels pending order |
| `editCashierOrder(id)` | cashier/orders.js | Loads order into cashier cart for editing |
| `settleDelivery(id)` | cashier/orders.js | Settles COD delivery (paid + completed) |
| `cashierSettleDineIn(id)` | cashier/orders.js | Settles waiter dine-in delivery |
| `confirmPayOngkir(id)` | cashier/orders.js | Pays courier ongkir fee |
| `confirmSettleDelivery(id)` | cashier/orders.js | Confirms delivery settlement |
| `payMitraPayout(id)` | cashier/orders.js | Pays mitra payout, marks as paid |
| `showCourierOrderDetail(id)` | overview.js | Shows courier order detail modal |
| `changeOrderTable(orderId)` | orders.js/staff | Shows table change modal |
| `renderCashierPayment()` | cashier/donetoday.js | Renders done-today/payment screen |
| `renderCashierReport()` | cashier/donetoday.js | Renders cashier daily report |
| `renderCashierCreateOrder()` | cashier/create-order.js | Renders manual order creation |
| `renderCashierProfile()` | cashier/... | Renders cashier profile via generic profile |
| `renderActiveOrders()` | overview.js | Renders active orders list |
| `renderActivePlaygroundTickets()` | overview.js | Renders active playground tickets |

---

## 16. Print Functions

| Function | Location | Description |
|---|---|---|
| `printCashierInvoice(id)` | cashier/orders.js | Prints standard cashier invoice |
| `printOngkirInvoice(id)` | cashier/orders.js | Prints courier ongkir invoice |
| `printRevenueDetail()` | shared/finance.js | Prints revenue report |
| `printExpenseDetail()` | shared/finance.js | Prints expense report |
| `printAvgDetail()` | shared/finance.js | Prints average daily report |
| `printProfitDetail()` | shared/finance.js | Prints profit/loss report |
| `printMitraInvoice(id)` | cook/mitra.js | Prints mitra payout invoice |
| `printPlaygroundInvoice(id)` | playground/tickets.js | Prints playground ticket invoice |

---

## Summary by Category

| Category | Count |
|---|---|
| Data/DB helpers | 2 |
| Utility helpers | 25 |
| Toast/Modal | 5 |
| Notifications | 18 |
| Hooks/Init | 15 |
| Core Shell/Login/Profile | 34 |
| Admin | 31 |
| Cashier | 18 |
| Customer | 30 |
| Kitchen | 4 |
| Courier | 6 |
| Waiter | 1 |
| Playground | 12 |
| Mitra Juru Masak | 7 |
| Manager | 2 |
| Shared (finance, stock, menu, etc.) | 30+ |
| Print | 8 |
| **Total (approx.)** | **~200+** |
