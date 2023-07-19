// import { hideLoader, showLoader } from '../redux/actions/LoaderActions';
// import UserService from '../services/UserService';
// import StorageUtils from './StorageUtils';
import { notification } from 'antd';
import { CheckCircleOutlined, CloseOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';
// import Colors from '../constants/Colors';
// import OptionService from '../services/OptionService';
// import ClientService from '../services/ClientService';
// import TeamService from '../services/TeamService';
// import isUUID from 'validator/lib/isUUID';
// import ProjectService from '../services/ProjectService';
// import PermissionService from '../services/PermissionService';
// import AuthService from '../services/AuthService';
// import FirmService from '../services/FirmService';
// import moment from 'moment';
// import AllocationService from '../services/AllocationService';
// import { setUser } from '../redux/actions/UserActions';
// import { APIUtil } from './ApiUtils';
// import packageJson from '../../package.json';
// import ExpenseService from '../services/ExpenseService';
// import { LeavesService } from '../services/LeavesService';
// import { InvoiceService } from '../services/InvoiceService';
// import TaxService from '../services/TaxService';
// import TaskService from '../services/TaskService';
// import MilestoneService from '../services/MilestoneService';
// import ReportService from '../services/ReportService';

export enum ENotificationType {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    INFO = 'INFO',
    WARNING = 'WARNING'
}

// const WeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export default class GenUtils {
    static dispatch:any;

    // static async init(dispatch?: any) {
    //     this.dispatch = dispatch;
    //     GenUtils.log('Next Version:', packageJson.version);

        // APIUtil.customHeaders = {}; // it should not be retained due to security issues
        //
        // const user = StorageUtils.getUserDetailsFromStorage();
        // if (!user) {
        //     return;
        // }

        // await FirmService.fetchFirms();
        // const firmId = StorageUtils.getFirmId()

        // if (!firmId) {
        //     return;
        // }

        // dispatch(setUser(user));
        // await UserService.fetchFirmDetails(firmId);
        // ClientService.fetchClients();
        // TeamService.fetchTeamDetails();
        // ProjectService.fetchAllProjects();
        // PermissionService.fetchPermissions();
        // OptionService.fetchAllOptions();
        // AllocationService.fetchAllocationData();
        // AuthService.fetchActivityLog();
        // ExpenseService.fetchExpenses();
        // LeavesService.fetchLeaves(user.uuid);
        // InvoiceService.fetchInvoices();
        // TaxService.fetchTaxes();
        // TaskService.fetchTasks();
        // MilestoneService.fetchMilestones();
    // }

    // static showLoader(componentName: string, text = '', isBlocking = false, type = 'SPINNER') {
    //     this.dispatch(showLoader(componentName, text, isBlocking, type));
    // }
    //
    // static hideLoader() {
    //     this.dispatch(hideLoader());
    // }

    static isStringEmpty(str: string): boolean {
        return (
            str === null ||
            !str ||
            str === 'null' ||
            str === 'undefined' ||
            (str.includes('null') && str.length === 'null'.length) ||
            (str.includes('undefined') && str.length === 'undefined'.length) ||
            str === ''
        );
    }

    static isEmpty(
        obj: any,
        considerArrayOfNullAsEmpty = false // if true, it will consider this array as empty [null, undefined, [], "", 'null']
    ): boolean {
        let isEmpty =
            obj == null ||
            !obj ||
            (typeof obj === 'object' && Object.keys(obj)?.length === 0) ||
            this.isStringEmpty(JSON.stringify(obj)) ||
            (typeof obj === typeof [] && obj.length === 0);

        // if (isEmpty && obj !== undefined && moment(obj).isValid()) {
        //     isEmpty = false;
        // }

        if (considerArrayOfNullAsEmpty && typeof obj === typeof [] && !isEmpty) {
            for (let i in obj) {
                if (!this.isEmpty(i)) {
                    isEmpty = false;
                    break;
                }
                isEmpty = true;
            }
        }

        return isEmpty;
    }

    static log(message?: any, ...optionalParams: any[]) {
        if (GenUtils.isDev()) {
            optionalParams.length ? console.log(message, ...optionalParams) : console.log(message);
        }
    }

    static isTrue(value: string | boolean) {
        return value === true || value?.toString()?.toLowerCase() === 'true';
    }

    static isDev() {
        return process.env.NODE_ENV === 'development';
    }

    static capitalizeInitials(string: string) {
        if (!string) return string;
        return string.toString().split(' ').map(GenUtils.capitalizeFirstLetter).join(' ');
    }

    static capitalizeFirstLetter(str:string) {
        if (!str || typeof str !== 'string') return str;
        return str?.toString()?.charAt(0).toUpperCase() + str?.toString()?.slice(1);
    }

    // static getIconForNotification(type : any): { icon: any; style?: object } {
    //     switch (type) {
    //         case 'SUCCESS':
    //             return { icon: CheckCircleOutlined, style: { color: Colors.green } };
    //         case 'ERROR':
    //             return { icon: InfoCircleOutlined, style: { color: Colors.red } };
    //         case 'WARNING':
    //             return { icon: WarningOutlined, style: { color: Colors.orange } };
    //         case 'INFO':
    //             return { icon: InfoCircleOutlined, style: { color: Colors.blueLight } };
    //         case 'CLOSE':
    //             return { icon: CloseOutlined, style: { color: Colors.orange } };
    //         default:
    //             return { icon: null };
    //     }
    // }

    static showNotification(title: any, description:any , icon?: any, action?: any) {
        // ->>>>>>> use these lines to show toast somewhere <<<<<<<-
        // const notificationIcon = GenUtils.getIconForNotification(ENotificationType.ERROR);
        // GenUtils.showNotification('Failed to Delete', error, <notificationIcon.icon style={notificationIcon.style}/>)

        notification.open({
            message: GenUtils.capitalizeFirstLetter(title),
            description: GenUtils.capitalizeFirstLetter(description),
            btn: action,
            icon: icon,
            duration: 3,
        });
    }

    // static arrayToIdMap(array:any) {
    //     if (array.length) {
    //         const map = {};
    //         array.forEach((item:any )=> (map[item.uuid:] = item));
    //         return map;
    //     }
    //     return array;
    // }

    // static isUuid(uuid: string): boolean {
    //     return !GenUtils.isStringEmpty(uuid) && isUUID(uuid);
    // }
    //
    // static getTagColorByStatus(status:any) {
    //     if (!status) return Colors.green;
    //     switch (status.toLowerCase()) {
    //         case 'active':
    //         case 'submitted':
    //         case 'approved':
    //             return Colors.green;
    //         case 'inactive':
    //         case 'rejected':
    //             return Colors.orangeRed;
    //         case 'proposed':
    //             return Colors.violet;
    //         case 'not_invited':
    //         case 'canceled':
    //         case 'open':
    //             return Colors.orange;
    //         case 'invited':
    //         case 'completed':
    //         case 'invoiced':
    //         case 'partially_paid':
    //             return Colors.blueLight;
    //         default:
    //             return Colors.gray;
    //     }
    // }

    static getInitials(text:any) {
        return text
            ?.split(' ')
            .map((word:any) => word?.toString()?.charAt(0)?.toUpperCase())
            .join('');
    }

    // static removeEmptyKeysFromObject(object:any, nestingLevels = 0, allowExplicitValue = false, allowValue = undefined) {
    //     if (typeof object !== 'object' || Array.isArray(object)) return object;
    //
    //     return Object.keys(object).reduce((acc, key) => {
    //         const value = nestingLevels > 0 ? GenUtils.removeEmptyKeysFromObject(object[key], nestingLevels - 1, allowExplicitValue, allowValue) : object[key];
    //         return (allowExplicitValue && value === allowValue) || !GenUtils.isEmpty(value) ? {
    //             ...acc,
    //             [key]: value
    //         } : acc;
    //     }, {});
    // }

    // static getWeekDaySmallString = (idx:any) => {
    //     return WeekDays[idx].substring(0, 3);
    // };

    // static isDateInRange = (date:any, startDate:any, endDate:any) => {
    //     return date.getTime() >= startDate.getTime() && date.getTime() <= moment(endDate).endOf('day').toDate();
    // };

    // static getDateAndMonth = (date:any) => {
    //     const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    //     const day = date.getDate();
    //     const month = monthNames[date.getMonth()];
    //     return day + ' ' + month.substring(0, 3);
    // };

    // static getDifferenceDate = (date:any, difference:any) => {
    //     const nextDay = new Date(date);
    //     nextDay.setDate(date.getDate() + difference);
    //     return nextDay;
    // };

    // static sortByCreatedAt = (a: any, b: any) => moment(a.createdAt).isAfter(b.createdAt) ? 1 : -1;

    // static getTextColorBasedOnBgColorAdvanced = (bgColor: string, extremeLight = false, lightColor = Colors.white, darkColor = Colors.black) => {
    //     var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    //     var r = parseInt(color.substring(0, 2), 16); // hexToR
    //     var g = parseInt(color.substring(2, 4), 16); // hexToG
    //     var b = parseInt(color.substring(4, 6), 16); // hexToB
    //     var uicolors = [r / 255, g / 255, b / 255];
    //     var c = uicolors.map((col) => {
    //         if (col <= 0.03928) {
    //             return col / 12.92;
    //         }
    //         return Math.pow((col + 0.055) / 1.055, 2.4);
    //     });
    //     var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
    //
    //     return L && (L < (extremeLight ? 0.9 : 0.65)) ? lightColor: darkColor;
    // }

    // it removes any special characters and replaces any spaces with an underscore
    // static getSimpleStringKey = (complexString: string): string => {
    //     return complexString?.replaceAll(' ', '_').replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '').toLowerCase();
    // }
}

// export const getNestedData = (dataIndex: string, dataItem:any) => {
//     if (!dataIndex || !dataItem) return;
//     const split = dataIndex.split('.', 2);
//     if (dataIndex === '' || split.length === 0) return;
//     return split.length > 1 ? getNestedData(split[1], dataItem[split[0]]) :dataItem[split[0]];
// }

// export const groupData = (dataIndex, data = []) => {
//     return data.reduce((gd, d) => ({
//         ...gd,
//         [getNestedData(dataIndex, d)]: [...(gd[getNestedData(dataIndex, d)] || []), d],
//     }), {});
// }
