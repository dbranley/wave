// Copyright 2020 H2O.ai, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as Fluent from '@fluentui/react'
import { Box, box, Id, S } from 'h2o-wave'
import React from 'react'
import { Component, XComponents } from './form'
import { bond, wave } from './ui'

export const sidePanelB: Box<SidePanel | null> = box(null)

/**
 * A dialog box (Dialog) is a temporary pop-up that takes focus from the page or app
 * and requires people to interact with it. It’s primarily used for confirming actions,
 * such as deleting a file, or asking people to make a choice.
 */
export interface SidePanel {
  /** The side panel's title. */
  title: S
  /** The components displayed in this side panel. */
  items: Component[]
  /** The width of the dialog, e.g. '400px'. Defaults to '600px'. */
  width?: S
  /** An identifying name for this component. */
  name?: Id
  /** The events to capture on this side panel. */
  events?: S[]
}

export default bond(() => {
  const
    onDismiss = () => {
      const
        { name, events } = sidePanelB() || {},
        ev = events?.find(e => e === 'dismissed')

      if (ev && name) wave.emit(name, ev, true)
      sidePanelB(null)
    },
    render = () => {
      const { title, width = '600px', items = [] } = sidePanelB() || {}
      return (
        <Fluent.Panel isOpen={!!sidePanelB()} headerText={title} type={Fluent.PanelType.custom} customWidth={width} onDismiss={onDismiss}>
          <XComponents items={items} />
        </Fluent.Panel >
      )
    }
  return { render, sidePanelB }
})