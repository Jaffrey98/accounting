import frappe from 'frappejs';
import { _ } from 'frappejs/utils';

export default {
  async getTitle() {
    const accountingSettings = await frappe.getSingle('AccountingSettings');
    return accountingSettings.companyName;
  },
  groups: [
    {
      items: [
        {
          label: _('ToDo'), route: '#/list/ToDo'
        },
        {
          label: _('Event'), route: '#/list/Event'
        }
      ]
    },
    {
      title: _('Masters'),
      items: [
        {
          label: _('Item'), route: '#/list/Item'
        },
        {
          label: _('Party'), route: '#/list/Party'
        },
        {
          label: _('Invoice'), route: '#/list/Invoice'
        },
        {
          label: _('Tax'), route: '#/list/Tax'
        },
        {
          label: _('Account'), route: '#/list/Account'
        },
        {
          label: _('Warehouse'), route: '#/list/Warehouse'
        },
        {
          label: _('UoM'), route: '#/list/Uom'
        },
        {
          label: _('Sales'), route: '#/list/SalesOrder'
        },
        {
          label: _('Purchase'), route: '#/list/PurchaseOrder'
        },
        {
          label: _('Quotation'), route: '#/list/Quotation'
        }
        
      ]
    },
    {
      title: _('Reports'),
      items: [
        {
          label: _('General Ledger'), route: '#/report/general-ledger'
        }
      ]
    }
  ]
};
