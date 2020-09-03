///
/// Copyright © 2016-2020 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { BaseData } from '@shared/models/base-data';
import { DeviceId } from './id/device-id';
import { TenantId } from '@shared/models/id/tenant-id';
import { CustomerId } from '@shared/models/id/customer-id';
import { DeviceCredentialsId } from '@shared/models/id/device-credentials-id';
import { EntitySearchQuery } from '@shared/models/relation.models';
import { DeviceProfileId } from '@shared/models/id/device-profile-id';
import { RuleChainId } from '@shared/models/id/rule-chain-id';
import { EntityInfoData } from '@shared/models/entity.models';

export enum DeviceProfileType {
  DEFAULT = 'DEFAULT'
}

export enum DeviceTransportType {
  DEFAULT = 'DEFAULT',
  MQTT = 'MQTT',
  LWM2M = 'LWM2M'
}

export const deviceProfileTypeTranslationMap = new Map<DeviceProfileType, string>(
  [
    [DeviceProfileType.DEFAULT, 'device-profile.type-default']
  ]
);

export const deviceTransportTypeTranslationMap = new Map<DeviceTransportType, string>(
  [
    [DeviceTransportType.DEFAULT, 'device-profile.transport-type-default'],
    [DeviceTransportType.MQTT, 'device-profile.transport-type-mqtt'],
    [DeviceTransportType.LWM2M, 'device-profile.transport-type-lwm2m']
  ]
);

export interface DefaultDeviceProfileConfiguration {
  [key: string]: any;
}

export type DeviceProfileConfigurations = DefaultDeviceProfileConfiguration;

export interface DeviceProfileConfiguration extends DeviceProfileConfigurations {
  type: DeviceProfileType;
}

export interface DefaultDeviceProfileTransportConfiguration {
  [key: string]: any;
}

export interface MqttDeviceProfileTransportConfiguration {
  [key: string]: any;
}

export interface Lwm2mDeviceProfileTransportConfiguration {
  [key: string]: any;
}

export type DeviceProfileTransportConfigurations = DefaultDeviceProfileTransportConfiguration &
                                                   MqttDeviceProfileTransportConfiguration &
                                                   Lwm2mDeviceProfileTransportConfiguration;

export interface DeviceProfileTransportConfiguration extends DeviceProfileTransportConfigurations {
  type: DeviceTransportType;
}

export function createDeviceProfileConfiguration(type: DeviceProfileType): DeviceProfileConfiguration {
  let configuration: DeviceProfileConfiguration = null;
  if (type) {
    switch (type) {
      case DeviceProfileType.DEFAULT:
        const defaultConfiguration: DefaultDeviceProfileConfiguration = {};
        configuration = {...defaultConfiguration, type: DeviceProfileType.DEFAULT};
        break;
    }
  }
  return configuration;
}

export function createDeviceProfileTransportConfiguration(type: DeviceTransportType): DeviceProfileTransportConfiguration {
  let transportConfiguration: DeviceProfileTransportConfiguration = null;
  if (type) {
    switch (type) {
      case DeviceTransportType.DEFAULT:
        const defaultTransportConfiguration: DefaultDeviceProfileTransportConfiguration = {};
        transportConfiguration = {...defaultTransportConfiguration, type: DeviceTransportType.DEFAULT};
        break;
      case DeviceTransportType.MQTT:
        const mqttTransportConfiguration: MqttDeviceProfileTransportConfiguration = {};
        transportConfiguration = {...mqttTransportConfiguration, type: DeviceTransportType.MQTT};
        break;
      case DeviceTransportType.LWM2M:
        const lwm2mTransportConfiguration: Lwm2mDeviceProfileTransportConfiguration = {};
        transportConfiguration = {...lwm2mTransportConfiguration, type: DeviceTransportType.LWM2M};
        break;
    }
  }
  return transportConfiguration;
}

export interface DeviceProfileData {
  configuration: DeviceProfileConfiguration;
  transportConfiguration: DeviceProfileTransportConfiguration;
}

export interface DeviceProfile extends BaseData<DeviceProfileId> {
  tenantId?: TenantId;
  name: string;
  description?: string;
  default: boolean;
  type: DeviceProfileType;
  transportType: DeviceTransportType;
  defaultRuleChainId?: RuleChainId;
  profileData: DeviceProfileData;
}

export interface DeviceProfileInfo extends EntityInfoData {
  type: DeviceProfileType;
  transportType: DeviceTransportType;
}

export interface DefaultDeviceConfiguration {
  [key: string]: any;
}

export type DeviceConfigurations = DefaultDeviceConfiguration;

export interface DeviceConfiguration extends DeviceConfigurations {
  type: DeviceProfileType;
}

export interface DefaultDeviceTransportConfiguration {
  [key: string]: any;
}

export interface MqttDeviceTransportConfiguration {
  [key: string]: any;
}

export interface Lwm2mDeviceTransportConfiguration {
  [key: string]: any;
}

export type DeviceTransportConfigurations = DefaultDeviceTransportConfiguration &
  MqttDeviceTransportConfiguration &
  Lwm2mDeviceTransportConfiguration;

export interface DeviceTransportConfiguration extends DeviceTransportConfigurations {
  type: DeviceTransportType;
}

export interface DeviceData {
  configuration: DeviceConfiguration;
  transportConfiguration: DeviceTransportConfiguration;
}

export interface Device extends BaseData<DeviceId> {
  tenantId?: TenantId;
  customerId?: CustomerId;
  name: string;
  type: string;
  label: string;
  deviceProfileId?: DeviceProfileId;
  deviceData?: DeviceData;
  additionalInfo?: any;
}

export interface DeviceInfo extends Device {
  customerTitle: string;
  customerIsPublic: boolean;
  deviceProfileName: string;
}

export enum DeviceCredentialsType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  X509_CERTIFICATE = 'X509_CERTIFICATE'
}

export const credentialTypeNames = new Map<DeviceCredentialsType, string>(
  [
    [DeviceCredentialsType.ACCESS_TOKEN, 'Access token'],
    [DeviceCredentialsType.X509_CERTIFICATE, 'X.509 Certificate'],
  ]
);

export interface DeviceCredentials extends BaseData<DeviceCredentialsId> {
  deviceId: DeviceId;
  credentialsType: DeviceCredentialsType;
  credentialsId: string;
  credentialsValue: string;
}

export interface DeviceSearchQuery extends EntitySearchQuery {
  deviceTypes: Array<string>;
}

export interface ClaimRequest {
  secretKey: string;
}

export enum ClaimResponse {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  CLAIMED = 'CLAIMED'
}

export interface ClaimResult {
  device: Device;
  response: ClaimResponse;
}
