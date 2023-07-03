import * as React from 'react';
import styles from './CitiesList.module.scss';
import { ICitiesListState } from './ICitiesListState';
import { ICitiesListProps } from './ICitiesListProps';
import { IListItems } from './IListItems';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { SPFI, spfi } from '@pnp/sp';
import { getSP } from './pnpjsConfig';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";



export default class CitiesList extends React.Component<ICitiesListProps, ICitiesListState, {}> {
  private _sp: SPFI;

  public constructor(props) {
    super(props);
    this.state = { ListItems: [] };
    this._sp = getSP();
  }



  private async GetItems() {
    try {
      debugger;
      const spCache = spfi(this._sp);
      const response: IListItems[] = await spCache.web.lists
        .getByTitle("Cities")
        .items
        .select("Title", "Country")();
      console.log(response);
      this.setState({ ListItems: response });

    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }


  public componentDidMount(): void {
    this.GetItems();

  }

  public render(): React.ReactElement<ICitiesListProps> {
    const {
      ListTitle,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    let category: string = "";


    return (
      <section >

        <div >
          <h1>List of Cities</h1>
          <h2>List Name: {this.props.ListTitle}</h2>
          <ListView
            items={this.state.ListItems}
            viewFields={[{ name: "Title", maxWidth: 100 }, { name: "Country" }]}
            iconFieldName="ServerRelativeUrl"
            compact={true}
            selectionMode={SelectionMode.multiple}
            showFilter={true}
            filterPlaceHolder="Search..."
            dragDropFiles={true}
            stickyHeader={true}
          />
        </div>

      </section>
    );
  }
}

