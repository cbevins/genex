<ul>
    <li class="px-2 hover:bg-secondary-100">One</li>
    <li class="px-2 hover:bg-secondary-100">Two</li>
    <li class="px-2 hover:bg-secondary-100">four</li>
    <li>
        <a
            data-twe-collapse-init
            href="#collapseThree"
            role="button"
            aria-expanded="false"
            aria-controls="collapseThree"
            class="flex items-center px-2 hover:bg-secondary-100 focus:text-primary active:text-primary">
<!-- 
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="h-4 w-4">
                <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5 l 7.5 7.5-7.5 7.5" />
        </svg>
         -->
        Three
        </a>
        <ul
            class="!visible hidden"
            id="collapseThree"
            data-twe-collapse-item>
            <li class="ml-4 px-2 hover:bg-secondary-100">Second-one</li>
            <li class="ml-4 px-2 hover:bg-secondary-100">Second-two</li>
            <li class="ml-4">
            <a
                data-twe-collapse-init
                href="#collapseSecondThree"
                role="button"
                aria-expanded="false"
                aria-controls="collapseSecondThree"
                class="flex items-center px-2 hover:bg-secondary-100 focus:text-primary active:text-primary">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="h-4 w-4">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                Second-three
            </a>
            <ul
            class="!visible hidden"
            id="collapseSecondThree"
            data-twe-collapse-item>
            <li class="ml-4 px-2">
              <a
                data-twe-collapse-init
                href="#collapseThirdOne"
                role="button"
                aria-expanded="false"
                aria-controls="collapseThirdOne"
                class="flex items-center px-2 hover:bg-secondary-100 focus:text-primary active:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="h-4 w-4">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg
                >Third-one
              </a>
              <ul
                class="!visible hidden"
                id="collapseThirdOne"
                data-twe-collapse-item>
                <li class="ml-4 px-2 hover:bg-secondary-100">
                  Fourth-one
                </li>
                <li class="ml-4 px-2 hover:bg-secondary-100">
                  Fourth-two
                </li>
                <li class="ml-4 px-2 hover:bg-secondary-100">
                  Fourth-three
                </li>
              </ul>
            </li>
            <li class="ml-4 px-2 hover:bg-secondary-100">Third-two</li>
            <li class="ml-4">
              <a
                data-twe-collapse-init
                href="#collapseThirdThree"
                role="button"
                aria-expanded="false"
                aria-controls="collapseThirdThree"
                class="flex items-center px-2 hover:bg-secondary-100 focus:text-primary active:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="h-4 w-4">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg
                >Third-three
              </a>
              <ul
                class="!visible hidden"
                id="collapseThirdThree"
                data-twe-collapse-item>
                <li class="ml-4 px-2 hover:bg-secondary-100">
                  Fourth-one
                </li>
                <li class="ml-4 px-2 hover:bg-secondary-100">
                  Fourth-two
                </li>
                <li class="ml-4 px-2 hover:bg-secondary-100">
                  Fourth-three
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>